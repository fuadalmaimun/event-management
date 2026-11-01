"use client";

import { useEffect, useMemo, useState, type ElementType } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  Clock3,
  MapPin,
  TrendingUp,
  Users,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Event {
  _id: string;
  allEventId?: string;
  eventId?: string;
  title: string;
  description?: string;
  eventType?: string;
  image?: string;
  location?: string;
  eventDate: string;
  organizerEmail?: string;
  email?: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const eventChartConfig = {
  total: {
    label: "Events",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const typeChartConfig = {
  total: {
    label: "Events",
  },
  Community: {
    label: "Community",
    color: "var(--chart-1)",
  },
  Charity: {
    label: "Charity",
    color: "var(--chart-2)",
  },
  Environment: {
    label: "Environment",
    color: "var(--chart-3)",
  },
  Education: {
    label: "Education",
    color: "var(--chart-4)",
  },
  Other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: ElementType;
}) {
  return (
    <Card className="group border-forest/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-lime/70 hover:shadow-lg dark:border-white/10">
      <CardContent className="flex items-start justify-between p-5 sm:p-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-black tracking-tight text-foreground">
            {value}
          </h3>

          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="rounded-2xl bg-lime/20 p-3 text-forest transition-colors group-hover:bg-lime dark:text-lime">
          <Icon size={22} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  const [createdEvents, setCreatedEvents] = useState<Event[]>([]);
  const [joinedEvents, setJoinedEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  const email = session?.user?.email;

  // Fetch dashboard data after the session is available.
  useEffect(() => {
    if (isPending || !email) return;

    const fetchDashboardData = async () => {
      try {
        setError("");

        const token = await getTokenFromClient();

        if (!token) {
          throw new Error("Unable to verify your session. Please login again.");
        }

        const authHeaders = { Authorization: `Bearer ${token}` };

        const [createdResponse, joinedResponse] = await Promise.all([
          fetch(`${API}/my-events`, {
            cache: "no-store",
            headers: authHeaders,
          }),
          fetch(`${API}/joined-events`, {
            cache: "no-store",
            headers: authHeaders,
          }),
        ]);

        if (!createdResponse.ok || !joinedResponse.ok) {
          throw new Error("Unable to load dashboard analytics.");
        }

        const [createdData, joinedData] = await Promise.all([
          createdResponse.json(),
          joinedResponse.json(),
        ]);

        setCreatedEvents(Array.isArray(createdData) ? createdData : []);
        setJoinedEvents(Array.isArray(joinedData) ? joinedData : []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Analytics could not be loaded. Please try again.");
      }
    };

    fetchDashboardData();
  }, [email, isPending]);

  // Calculate dashboard analytics.
  const analytics = useMemo(() => {
    const now = new Date();

    const upcomingCreated = createdEvents.filter(
      (event) => new Date(event.eventDate) >= now
    );

    const upcomingJoined = joinedEvents.filter(
      (event) => new Date(event.eventDate) >= now
    );

    const pastCreated = createdEvents.filter(
      (event) => new Date(event.eventDate) < now
    );

    const pastJoined = joinedEvents.filter(
      (event) => new Date(event.eventDate) < now
    );

    const typeCounts = new Map<string, number>();

    [...createdEvents, ...joinedEvents].forEach((event) => {
      const type = event.eventType || "Other";
      typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    });

    const typeData = Array.from(typeCounts.entries()).map(
      ([name, total]) => ({
        name,
        total,
        fill: `var(--color-${name in typeChartConfig ? name : "Other"})`,
      })
    );

    return {
      upcomingCreated,
      upcomingJoined,
      pastCreated,
      pastJoined,
      typeData,
      totalCreated: createdEvents.length,
      totalJoined: joinedEvents.length,
    };
  }, [createdEvents, joinedEvents]);

  const comparisonData = [
    {
      name: "Created",
      total: analytics.totalCreated,
    },
    {
      name: "Joined",
      total: analytics.totalJoined,
    },
  ];

  // Combine created and joined upcoming events.
  const upcomingEvents = [
    ...analytics.upcomingCreated.map((event) => ({
      ...event,
      category: "Organizing",
      href: `/events/${event.allEventId || event._id}`,
    })),

    ...analytics.upcomingJoined.map((event) => ({
      ...event,
      category: "Participating",
      href: `/events/${event.eventId || event._id}`,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() -
        new Date(b.eventDate).getTime()
    )
    .slice(0, 5);

  if (error) {
    return (
      <main className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10">
        <Card className="border-red-500/20">
          <CardContent className="p-8 text-center">
            <p className="font-semibold text-red-500">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-lime"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        {/* Dashboard heading */}
        <section className="relative overflow-hidden rounded-[2rem] bg-forest p-6 text-white sm:p-9 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-lime/10" />

          <div className="pointer-events-none absolute -bottom-28 right-36 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-lime">
                <Activity size={14} />
                Your activity overview
              </div>

              <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back,{" "}
                <span className="text-lime">
                  {session?.user?.name?.split(" ")[0] || "Friend"}!
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
                Every event you create and every community you join makes a
                difference. Here is your GoodTogether impact at a glance.
              </p>
            </div>

            <Link
              href="/events/create"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-black text-forest-deep transition hover:-translate-y-1 hover:shadow-xl hover:shadow-lime/20"
            >
              <CalendarPlus size={17} />
              Create an event
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Events Created"
            value={analytics.totalCreated}
            description="Events you organized"
            icon={CalendarPlus}
          />

          <StatCard
            title="Events Joined"
            value={analytics.totalJoined}
            description="Communities you participated in"
            icon={Users}
          />

          <StatCard
            title="Upcoming Events"
            value={
              analytics.upcomingCreated.length +
              analytics.upcomingJoined.length
            }
            description="Your upcoming activities"
            icon={CalendarCheck}
          />

          <StatCard
            title="Completed Events"
            value={
              analytics.pastCreated.length +
              analytics.pastJoined.length
            }
            description="Past event records"
            icon={TrendingUp}
          />
        </section>

        {/* Analytics */}
        <section className="mt-9">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[2px] text-forest dark:text-lime">
              Your insights
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Activity analytics
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              A visual breakdown of your community involvement.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-5">
            {/* Created vs Joined */}
            <Card className="border-forest/10 lg:col-span-3 dark:border-white/10">
              <CardHeader>
                <CardTitle>Created vs Joined</CardTitle>

                <CardDescription>
                  Compare your event organizing and participation.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ChartContainer
                  config={eventChartConfig}
                  className="h-[280px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={comparisonData}
                    margin={{ left: 0, right: 12, top: 12 }}
                  >
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />

                    <YAxis
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />

                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />

                    <Bar
                      dataKey="total"
                      fill="var(--color-total)"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={75}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Event types */}
            <Card className="border-forest/10 lg:col-span-2 dark:border-white/10">
              <CardHeader>
                <CardTitle>Event categories</CardTitle>

                <CardDescription>
                  Event types across your activity.
                </CardDescription>
              </CardHeader>

              <CardContent>
                {analytics.typeData.length > 0 ? (
                  <ChartContainer
                    config={typeChartConfig}
                    className="mx-auto h-[280px] w-full"
                  >
                    <PieChart>
                      <ChartTooltip
                        content={
                          <ChartTooltipContent nameKey="name" />
                        }
                      />

                      <Pie
                        data={analytics.typeData}
                        dataKey="total"
                        nameKey="name"
                        innerRadius={58}
                        outerRadius={95}
                        paddingAngle={4}
                      >
                        {analytics.typeData.map((entry, index) => (
                          <Cell
                            key={`${entry.name}-${index}`}
                            fill={entry.fill}
                          />
                        ))}
                      </Pie>

                      <ChartLegend
                        content={
                          <ChartLegendContent nameKey="name" />
                        }
                      />
                    </PieChart>
                  </ChartContainer>
                ) : (
                  <div className="flex h-[280px] items-center justify-center text-center text-sm text-muted-foreground">
                    Create or join events to see category analytics.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Upcoming events */}
        <section className="mt-9">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[2px] text-forest dark:text-lime">
                Stay involved
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                Your upcoming events
              </h2>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-1 text-sm font-bold text-forest transition hover:text-lime dark:text-lime"
            >
              Explore events <ArrowUpRight size={16} />
            </Link>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {upcomingEvents.map((event, index) => (
                <Link
                  key={`${event._id}-${event.category}-${index}`}
                  href={event.href}
                  className="group rounded-2xl border border-forest/10 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/70 hover:shadow-lg dark:border-white/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-full bg-lime/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-forest dark:text-lime">
                      {event.category}
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-forest dark:group-hover:text-lime"
                    />
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-lg font-extrabold">
                    {event.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <CalendarDays size={14} />
                      {formatDate(event.eventDate)}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span className="truncate">
                        {event.location || "Location not specified"}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-forest/20">
              <CardContent className="flex flex-col items-center px-5 py-12 text-center">
                <Clock3
                  size={32}
                  className="text-muted-foreground"
                />

                <h3 className="mt-4 text-lg font-bold">
                  Nothing upcoming yet
                </h3>

                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Create an event or join a community event to see your next
                  activities here.
                </p>

                <Link
                  href="/events"
                  className="mt-5 rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-lime dark:bg-lime dark:text-forest-deep"
                >
                  Explore events
                </Link>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
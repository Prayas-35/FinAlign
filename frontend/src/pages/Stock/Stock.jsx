
import { ResponsiveLine } from "@nivo/line"
import Header from "../../components/Header/Header"

export default function Stock() {
  return (
    <div className="text-customteal bg-black">
    <Header/>
    <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-4 sm:p-6">
        <div className="flex flex-col gap-6">
          <div className="bg-background rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold">$145.32</span>
                <span className="text-sm text-green-500">+2.4%</span>
              </div>
              <div className="text-lg font-semibold">Apple Inc. (AAPL)</div>
            </div>
            <div className="p-6">
              <TimeseriesChart className="aspect-[4/3]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground rounded-lg" />
              <input type="search" placeholder="Search stocks..." className="pl-8 w-full rounded-lg" />
            </div>
            <button variant="outline">Filter</button>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="bg-background rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <div className="text-lg font-semibold">Top Gainers</div>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 w-8 h-8 flex items-center justify-center text-green-50">
                    TSLA
                  </div>
                  <div>Tesla Inc.</div>
                </div>
                <div className="flex items-baseline gap-1 text-green-500">
                  <span className="font-bold">$850.32</span>
                  <span className="text-sm">+4.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 w-8 h-8 flex items-center justify-center text-green-50">
                    NVDA
                  </div>
                  <div>Nvidia Corp.</div>
                </div>
                <div className="flex items-baseline gap-1 text-green-500">
                  <span className="font-bold">$280.15</span>
                  <span className="text-sm">+3.7%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-500 w-8 h-8 flex items-center justify-center text-green-50">
                    AMZN
                  </div>
                  <div>Amazon.com Inc.</div>
                </div>
                <div className="flex items-baseline gap-1 text-green-500">
                  <span className="font-bold">$3,120.32</span>
                  <span className="text-sm">+2.9%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b">
              <div className="text-lg font-semibold">Top Losers</div>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-500 w-8 h-8 flex items-center justify-center text-red-50">
                    META
                  </div>
                  <div>Meta Platforms Inc.</div>
                </div>
                <div className="flex items-baseline gap-1 text-red-500">
                  <span className="font-bold">$180.32</span>
                  <span className="text-sm">-3.2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-500 w-8 h-8 flex items-center justify-center text-red-50">
                    NFLX
                  </div>
                  <div>Netflix Inc.</div>
                </div>
                <div className="flex items-baseline gap-1 text-red-500">
                  <span className="font-bold">$320.15</span>
                  <span className="text-sm">-2.7%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-red-500 w-8 h-8 flex items-center justify-center text-red-50">
                    TWTR
                  </div>
                  <div>Twitter Inc.</div>
                </div>
                <div className="flex items-baseline gap-1 text-red-500">
                  <span className="font-bold">$45.32</span>
                  <span className="text-sm">-1.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function StoreIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  )
}


function TimeseriesChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "2018-01-01", y: 7 },
              { x: "2018-01-02", y: 5 },
              { x: "2018-01-03", y: 11 },
              { x: "2018-01-04", y: 9 },
              { x: "2018-01-05", y: 12 },
              { x: "2018-01-06", y: 16 },
              { x: "2018-01-07", y: 13 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "2018-01-01", y: 9 },
              { x: "2018-01-02", y: 8 },
              { x: "2018-01-03", y: 13 },
              { x: "2018-01-04", y: 6 },
              { x: "2018-01-05", y: 8 },
              { x: "2018-01-06", y: 14 },
              { x: "2018-01-07", y: 11 },
            ],
          },
        ]}
        margin={{ top: 10, right: 20, bottom: 40, left: 40 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%d",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%Y-%m-%d"
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
          format: "%d",
          tickValues: "every 1 day",
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}
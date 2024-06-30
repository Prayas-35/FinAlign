import { ResponsivePie } from "@nivo/pie"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import Header from "../../components/Header/Header"

export default function Analytics() {
  const yearlyData = [
    { label: "Revenue", value: 5000 },
    { label: "Expenses", value: 3000 },
    { label: "Profit", value: 2000 },
  ]
  const monthlyData = [
    { month: "Jan", value: 500 },
    { month: "Feb", value: 600 },
    { month: "Mar", value: 800 },
    { month: "Apr", value: 700 },
    { month: "May", value: 650 },
    { month: "Jun", value: 750 },
    { month: "Jul", value: 900 },
    { month: "Aug", value: 850 },
    { month: "Sep", value: 750 },
    { month: "Oct", value: 800 },
    { month: "Nov", value: 900 },
    { month: "Dec", value: 950 },
  ]
  const dailyData = [
    { date: "2023-06-01", value: 50 },
    { date: "2023-06-02", value: 55 },
    { date: "2023-06-03", value: 60 },
    { date: "2023-06-04", value: 65 },
    { date: "2023-06-05", value: 70 },
    { date: "2023-06-06", value: 75 },
    { date: "2023-06-07", value: 80 },
    { date: "2023-06-08", value: 85 },
    { date: "2023-06-09", value: 90 },
    { date: "2023-06-10", value: 95 },
  ]
  return (
    <div className="bg-black text-customteal">
      <Header />
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-background border-2 border-customteal rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-4">Yearly</h2>
          <PieChart className="aspect-square" />
        </div>
        <div className="bg-background rounded-lg border-2 border-customteal shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-4">Monthly</h2>
          <BarChart className="aspect-[16/9]" />
        </div>
        <div className="bg-background rounded-lg border-2 border-customteal shadow-lg p-6 hover:scale-105 transition-transform duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-4">Daily</h2>
          <LineChart className="aspect-[16/9]" />
        </div>
      </div>
    </div>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
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
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}


function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
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


function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
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
        }}
        role="application"
      />
    </div>
  )
}

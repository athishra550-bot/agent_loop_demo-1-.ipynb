
import { useState } from "react";
import FDRSubmission from "./FDRSubmission";
import {
  LayoutDashboard,
  Building2,
  FileText,
  ShieldCheck,
  CalendarDays,
  RefreshCw,
  Wallet,
  Bell,
  Search,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Eye,
  ChevronDown,
  Download,
  Plus
} from "lucide-react";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Institutions", icon: Building2 },
  { name: "FDR Repository", icon: FileText },
  { name: "Verification", icon: ShieldCheck },
  { name: "Maturity Tracking", icon: CalendarDays },
  { name: "Renewals", icon: RefreshCw },
  { name: "Release Requests", icon: Wallet }
];

const fdrRecords = [
  {
    id: "FDR202600123",
    institution: "ABC Engineering College",
    bank: "State Bank of India",
    amount: "₹10,00,000",
    maturity: "10 Nov 2026",
    status: "Expiring Soon"
  },
  {
    id: "FDR202600124",
    institution: "National Institute of Technology",
    bank: "HDFC Bank",
    amount: "₹25,00,000",
    maturity: "20 Dec 2026",
    status: "Verified"
  },
  {
    id: "FDR202600125",
    institution: "Global Academy of Technology",
    bank: "ICICI Bank",
    amount: "₹15,00,000",
    maturity: "15 Oct 2026",
    status: "Matured"
  },
  {
    id: "FDR202600126",
    institution: "City Engineering Institute",
    bank: "Canara Bank",
    amount: "₹8,00,000",
    maturity: "15 Jan 2027",
    status: "Pending"
  }
];

const stats = [
  {
    title: "Total FDRs",
    value: "1,284",
    change: "+12.5%",
    icon: FileText,
    color: "blue",
    description: "Across all institutions"
  },
  {
    title: "Active FDRs",
    value: "1,042",
    change: "+8.2%",
    icon: CheckCircle2,
    color: "green",
    description: "Currently valid instruments"
  },
  {
    title: "Pending Verification",
    value: "86",
    change: "Needs attention",
    icon: Clock,
    color: "orange",
    description: "Awaiting official review"
  },
  {
    title: "Expiring Soon",
    value: "42",
    change: "Next 30 days",
    icon: AlertTriangle,
    color: "red",
    description: "Require renewal action"
  }
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [records, setRecords] = useState(fdrRecords);
  const filteredRecords = records.filter((record) =>
    `${record.id} ${record.institution} ${record.bank}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  if (activePage === "Submit FDR") {
  return (
    <FDRSubmission
      onCancel={() => setActivePage("Dashboard")}
      onSubmit={(record) => {
        setRecords((previous) => [record, ...previous]);
        setActivePage("Dashboard");
      }}
    />
  );
}

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#10243A] text-white transition-transform duration-300 ${
        mobileMenu ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">AICTE</h1>
              <p className="text-[10px] tracking-widest text-slate-400">
                FDR MANAGEMENT
              </p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = activePage === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name);
                    setMobileMenu(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={19} />
                  {item.name}
                  {item.name === "Verification" && (
                    <span className="ml-auto rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                      86
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="mb-4 mt-10 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
            System
          </p>

          <button
            onClick={() => setActivePage("Reports")}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
              activePage === "Reports"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <TrendingUp size={19} />
            Reports & Analytics
          </button>

          <button
            onClick={() => setActivePage("Settings")}
            className={`mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
              activePage === "Settings"
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>
        </div>

        {/* User Profile */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
              AO
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Admin Officer</p>
              <p className="text-xs text-slate-400">AICTE Official</p>
            </div>
            <LogOut size={17} className="text-slate-400" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
    <main
  style={{
    marginLeft: "256px",
    width: "calc(100% - 256px)",
    minHeight: "100vh"
  }}
>

        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">

          <div className="flex items-center gap-4">
            <button
              className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {activePage}
              </h2>
              <p className="hidden text-xs text-slate-400 sm:block">
                AICTE / Regulation Bureau / {activePage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 md:flex">
              <Search size={17} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search records..."
                className="w-36 text-sm outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="relative rounded-lg p-2 hover:bg-slate-100">
              <Bell size={21} className="text-slate-600" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                AO
              </div>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="mx-auto max-w-[1600px] p-5 md:p-8">

          {/* Welcome Section */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Welcome back, Officer!
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Here's an overview of security deposits and FDR activities.
              </p>
            </div>

            <button
  onClick={() => setActivePage("Submit FDR")}
  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
>
              <Plus size={18} />
              New FDR Record
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              
const colors: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600"
};


              return (
                <div
                  key={stat.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colors[stat.color]}`}>
                      <Icon size={22} />
                    </div>
                    <ArrowUpRight size={19} className="text-slate-300" />
                  </div>

                  <p className="mt-5 text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500">
                      {stat.change}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Alert Section */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-orange-200 bg-orange-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-orange-900">
                  Attention Required
                </h3>
                <p className="mt-1 text-sm text-orange-800">
                  42 FDRs are approaching maturity. Review renewal requirements.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivePage("Maturity Tracking")}
              className="whitespace-nowrap text-sm font-semibold text-orange-700 hover:text-orange-900"
            >
              View Expiring FDRs →
            </button>
          </div>

          {/* FDR Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-bold text-slate-900">
                  Recent FDR Records
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Latest submitted security deposit instruments
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  <Download size={15} />
                  Export
                </button>
                <button
                  onClick={() => setActivePage("FDR Repository")}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">FDR Number</th>
                    <th className="px-5 py-4">Institution</th>
                    <th className="px-5 py-4">Bank</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Maturity Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 text-xs font-semibold text-blue-700">
                        {record.id}
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {record.institution}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {record.bank}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                        {record.amount}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {record.maturity}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                          record.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : record.status === "Expiring Soon"
                            ? "bg-orange-50 text-orange-700"
                            : record.status === "Matured"
                            ? "bg-red-50 text-red-700"
                            : "bg-blue-50 text-blue-700"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          title="View FDR"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-sm text-slate-400"
                      >
                        No matching FDR records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
              Showing {filteredRecords.length} of {fdrRecords.length} demo records
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row">
            <p>© 2026 AICTE FDR Management Portal</p>
            <p>Secure Administrative Management System · Prototype</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

export default App;

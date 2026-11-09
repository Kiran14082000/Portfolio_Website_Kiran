'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Activity, ArrowDownRight, ArrowLeft, ArrowUpRight, BrainCircuit, Database, Search, Sparkles, TrendingUp, Users } from 'lucide-react';

type RecordRow = {
  month: string;
  revenue: number;
  users: number;
  conversion: number;
  category: string;
};

const datasets: Record<string, RecordRow[]> = {
  ecommerce: [
    { month: 'Jan', revenue: 18400, users: 4200, conversion: 2.8, category: 'Retail' },
    { month: 'Feb', revenue: 22100, users: 4800, conversion: 3.1, category: 'Retail' },
    { month: 'Mar', revenue: 19800, users: 4550, conversion: 2.9, category: 'Retail' },
    { month: 'Apr', revenue: 26700, users: 5600, conversion: 3.5, category: 'Retail' },
    { month: 'May', revenue: 29400, users: 6100, conversion: 3.8, category: 'Retail' },
    { month: 'Jun', revenue: 33800, users: 7200, conversion: 4.2, category: 'Retail' },
    { month: 'Jul', revenue: 31500, users: 6900, conversion: 3.9, category: 'Retail' },
    { month: 'Aug', revenue: 38200, users: 8100, conversion: 4.5, category: 'Retail' },
    { month: 'Sep', revenue: 41700, users: 8900, conversion: 4.7, category: 'Retail' },
    { month: 'Oct', revenue: 39600, users: 8500, conversion: 4.4, category: 'Retail' },
    { month: 'Nov', revenue: 48200, users: 10200, conversion: 5.1, category: 'Retail' },
    { month: 'Dec', revenue: 56400, users: 11900, conversion: 5.6, category: 'Retail' },
  ],
  subscriptions: [
    { month: 'Jan', revenue: 12800, users: 2100, conversion: 3.2, category: 'SaaS' },
    { month: 'Feb', revenue: 13500, users: 2250, conversion: 3.4, category: 'SaaS' },
    { month: 'Mar', revenue: 14900, users: 2400, conversion: 3.5, category: 'SaaS' },
    { month: 'Apr', revenue: 15200, users: 2520, conversion: 3.6, category: 'SaaS' },
    { month: 'May', revenue: 16800, users: 2780, conversion: 3.8, category: 'SaaS' },
    { month: 'Jun', revenue: 18100, users: 2960, conversion: 4.0, category: 'SaaS' },
    { month: 'Jul', revenue: 17900, users: 3050, conversion: 3.9, category: 'SaaS' },
    { month: 'Aug', revenue: 19600, users: 3280, conversion: 4.2, category: 'SaaS' },
    { month: 'Sep', revenue: 21300, users: 3490, conversion: 4.4, category: 'SaaS' },
    { month: 'Oct', revenue: 22600, users: 3710, conversion: 4.6, category: 'SaaS' },
    { month: 'Nov', revenue: 24100, users: 3980, conversion: 4.8, category: 'SaaS' },
    { month: 'Dec', revenue: 26800, users: 4320, conversion: 5.0, category: 'SaaS' },
  ],
};

const money = (value: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value);

export default function DataLabPage() {
  const [dataset, setDataset] = useState('ecommerce');
  const [period, setPeriod] = useState('12');
  const [metric, setMetric] = useState<'revenue' | 'users' | 'conversion'>('revenue');
  const [query, setQuery] = useState('');

  const allRows = datasets[dataset];
  const rows = useMemo(
    () => allRows.slice(-Number(period)),
    [allRows, period],
  );

  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalUsers = rows.reduce((sum, row) => sum + row.users, 0);
  const averageConversion =
    rows.reduce((sum, row) => sum + row.conversion, 0) / rows.length;
  const firstValue = rows[0][metric];
  const lastValue = rows[rows.length - 1][metric];
  const change = firstValue === 0 ? 0 : ((lastValue - firstValue) / firstValue) * 100;
  const maxValue = Math.max(...rows.map(row => row[metric]), 1);
  const filteredRows = rows.filter(row =>
    `${row.month} ${row.category} ${row.revenue} ${row.users} ${row.conversion}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  const bestMonth = rows.reduce((best, row) =>
    row.revenue > best.revenue ? row : best,
  );

  const metricLabel = {
    revenue: 'Revenue',
    users: 'Active users',
    conversion: 'Conversion rate',
  }[metric];

  const metricValue = (row: RecordRow) =>
    metric === 'revenue'
      ? money(row.revenue)
      : metric === 'users'
        ? row.users.toLocaleString()
        : `${row.conversion.toFixed(1)}%`;

  return (
    <main className="lab-page">
      <div className="lab-noise" />
      <header className="lab-nav">
        <Link href="/" className="lab-brand">
          <span className="lab-mark">K<span>.</span></span>
          <span>KIRAN <span className="lab-muted">/ DATA & AI</span></span>
        </Link>
        <Link href="/" className="lab-back"><ArrowLeft size={15} /> Portfolio</Link>
      </header>

      <section className="lab-container">
        <div className="lab-hero">
          <div className="lab-eyebrow"><span /> INTERACTIVE PLAYGROUND / 001</div>
          <h1>Data tells a story.<br /><em>Let's find it.</em></h1>
          <p>
            Explore a sample business dataset, compare performance metrics, and
            discover patterns through interactive analytics.
          </p>
          <div className="lab-tags">
            <span><Database size={13} /> Data exploration</span>
            <span><TrendingUp size={13} /> Visualization</span>
            <span><BrainCircuit size={13} /> Analytical insights</span>
          </div>
        </div>

        <section className="lab-panel">
          <div className="lab-panel-head">
            <div>
              <div className="lab-eyebrow">01 / WORKSPACE</div>
              <h2>Performance overview</h2>
              <p>Change the dataset or period to explore the results.</p>
            </div>
            <span className="lab-demo-badge">DEMO DATA</span>
          </div>

          <div className="lab-controls">
            <label>
              <span>DATASET</span>
              <select value={dataset} onChange={e => setDataset(e.target.value)}>
                <option value="ecommerce">E-commerce performance</option>
                <option value="subscriptions">SaaS subscriptions</option>
              </select>
            </label>
            <label>
              <span>TIME WINDOW</span>
              <select value={period} onChange={e => setPeriod(e.target.value)}>
                <option value="3">Last 3 months</option>
                <option value="6">Last 6 months</option>
                <option value="12">Full year</option>
              </select>
            </label>
          </div>

          <div className="lab-kpis">
            <article className="lab-kpi">
              <div><span>Total revenue</span><span className="lab-kpi-icon"><TrendingUp size={17} /></span></div>
              <strong>{money(totalRevenue)}</strong>
              <small><span className="lab-positive"><ArrowUpRight size={13} /> {change >= 0 ? '+' : ''}{change.toFixed(1)}%</span> first to last month</small>
            </article>
            <article className="lab-kpi">
              <div><span>Active users</span><span className="lab-kpi-icon"><Users size={17} /></span></div>
              <strong>{totalUsers.toLocaleString()}</strong>
              <small>Combined monthly users</small>
            </article>
            <article className="lab-kpi">
              <div><span>Avg. conversion</span><span className="lab-kpi-icon"><Activity size={17} /></span></div>
              <strong>{averageConversion.toFixed(2)}%</strong>
              <small>Across selected months</small>
            </article>
          </div>

          <div className="lab-chart-panel">
            <div className="lab-chart-head">
              <div><span className="lab-chart-label">TREND EXPLORER</span><h3>{metricLabel} by month</h3></div>
              <select aria-label="Chart metric" value={metric} onChange={e => setMetric(e.target.value as typeof metric)}>
                <option value="revenue">Revenue</option>
                <option value="users">Active users</option>
                <option value="conversion">Conversion rate</option>
              </select>
            </div>
            <div className="lab-chart" role="img" aria-label={`${metricLabel} bar chart`}>
              {rows.map(row => (
                <div className="lab-bar-column" key={row.month} title={`${row.month}: ${metricValue(row)}`}>
                  <div className="lab-bar-value">{metric === 'revenue' ? `${Math.round(row.revenue / 1000)}k` : metricValue(row)}</div>
                  <div className="lab-bar-track">
                    <div className={`lab-bar ${row.month === bestMonth.month ? 'lab-bar-best' : ''}`} style={{ height: `${Math.max(5, (row[metric] / maxValue) * 100)}%` }} />
                  </div>
                  <span>{row.month}</span>
                </div>
              ))}
            </div>
            <div className="lab-chart-foot"><span><i /> Monthly {metricLabel.toLowerCase()}</span><span>Illustrative sample data · CAD where applicable</span></div>
          </div>

          <div className="lab-insight">
            <div className="lab-insight-icon"><Sparkles size={19} /></div>
            <div>
              <span className="lab-chart-label">DATA-DRIVEN INSIGHT</span>
              <h3>{bestMonth.month} is the strongest revenue month</h3>
              <p>
                In this sample, {bestMonth.month} leads the selected period with
                {' '}{money(bestMonth.revenue)} in revenue. The average conversion
                rate is {averageConversion.toFixed(2)}%. Compare the two datasets
                and switch metrics to investigate how activity and revenue move together.
              </p>
              <small>Rule-based analysis of the selected sample; not a live AI model.</small>
            </div>
          </div>
        </section>

        <section className="lab-panel lab-table-panel">
          <div className="lab-panel-head">
            <div><div className="lab-eyebrow">02 / DATA EXPLORER</div><h2>Inspect the records</h2><p>Search the visible sample rows by month, category, or value.</p></div>
            <span className="lab-record-count">{filteredRows.length} records</span>
          </div>
          <div className="lab-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search records..." aria-label="Search records" /></div>
          <div className="lab-table-scroll">
            <table className="lab-table">
              <thead><tr><th>MONTH</th><th>SEGMENT</th><th>REVENUE</th><th>ACTIVE USERS</th><th>CONVERSION</th></tr></thead>
              <tbody>
                {filteredRows.map(row => <tr key={row.month}><td>{row.month}</td><td><span className="lab-category">{row.category}</span></td><td>{money(row.revenue)}</td><td>{row.users.toLocaleString()}</td><td>{row.conversion.toFixed(1)}%</td></tr>)}
                {!filteredRows.length && <tr><td colSpan={5} className="lab-empty">No matching records. Try a different search.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="lab-footer">
          <span>BUILT WITH REACT · TYPESCRIPT · DATA VISUALIZATION</span>
          <Link href="/">Back to Kiran's portfolio <ArrowUpRight size={14} /></Link>
        </footer>
      </section>
    </main>
  );
}

import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'

export default function App() {
  const [data, setData] = useState([])
  const [filtered, setFiltered] = useState([])
  const [minAirFlow, setMinAirFlow] = useState('')
  const [maxPower, setMaxPower] = useState('')
  const [voltage, setVoltage] = useState('')

  useEffect(() => {
    Papa.parse('/SDC_Fan_Data.csv', {
      download: true,
      header: true,
      complete: (res) => {
        const rows = res.data.filter(r => r['Model']) // last empty row guard
        setData(rows)
        setFiltered(rows)
      }
    })
  }, [])

  const applyFilters = () => {
    const minAF = Number(minAirFlow) || 0
    const maxP = maxPower === '' ? Infinity : Number(maxPower)
    const result = data.filter(row => {
      const af = Number(row['Air Flow (m³/h)']) || 0
      const pw = Number(row['Power (W)']) || 0
      const volt = String(row['Voltage (V)'] || '').trim()
      const passAF = af >= minAF
      const passP = pw <= maxP
      const passV = voltage === '' || volt === String(voltage)
      return passAF && passP && passV
    })
    setFiltered(result)
  }

  return (
    <div style={{fontFamily:'Inter,Arial', padding: 24, maxWidth: 1200, margin: '0 auto'}}>
      <h2>Sezer Fan Selection – SDC Demo</h2>
      <div style={{display:'flex', gap:16, flexWrap:'wrap', alignItems:'end'}}>
        <div>
          <label>Min Air Flow (m³/h)</label><br/>
          <input type="number" value={minAirFlow} onChange={e=>setMinAirFlow(e.target.value)} placeholder="örn. 1000" />
        </div>
        <div>
          <label>Max Power (W)</label><br/>
          <input type="number" value={maxPower} onChange={e=>setMaxPower(e.target.value)} placeholder="örn. 200" />
        </div>
        <div>
          <label>Voltage (V)</label><br/>
          <select value={voltage} onChange={e=>setVoltage(e.target.value)}>
            <option value="">Hepsi</option>
            <option value="230">230</option>
            <option value="400">400</option>
          </select>
        </div>
        <button onClick={applyFilters} style={{padding:'8px 16px'}}>Filtrele</button>
      </div>

      <table style={{width:'100%', marginTop:16, borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#0a66c2', color:'#fff'}}>
            <th style={{border:'1px solid #ddd', padding:8}}>Model</th>
            <th style={{border:'1px solid #ddd', padding:8}}>Voltage (V)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>Power (W)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>Frequency (Hz)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>Speed (rpm)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>Air Flow (m³/h)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>A (mm)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>B (mm)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>C1 (mm)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>C2 (mm)</th>
            <th style={{border:'1px solid #ddd', padding:8}}>D (mm)</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, idx) => (
            <tr key={idx}>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Model']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Voltage (V)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Power (W)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Frequency (Hz)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Speed (rpm)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['Air Flow (m³/h)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['A (mm)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['B (mm)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['C1 (mm)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['C2 (mm)']}</td>
              <td style={{border:'1px solid #ddd', padding:8}}>{row['D (mm)']}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

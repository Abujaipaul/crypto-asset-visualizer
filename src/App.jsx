import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
    const [chartData, setChartData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
  

    useEffect(() => {
      setTimeout(async function fetchData (){
        try {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30')
  const data = await response.json()
  console.log(data)

  const cleanChartData = data.prices.map((item) => {
 
    const timeStamp = item[0];
    const coinPrice = item[1].toFixed(0);

    const formattedDate = new Date(timeStamp).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });
    //  console.log(formattedDate, coinPrice)

    return {
      date: formattedDate,
      price: coinPrice
    };
  });
   
  console.log(typeof cleanChartData)
  setChartData(cleanChartData);
  setIsLoading(false);

} catch (err) {
  console.log(err)
  alert(err)
  setIsLoading(false)
}
      },2000)
    }, [])

    if(isLoading){
      return <h1 style={{ color: 'blue', textAlign: 'center', marginTop:'100px' }}>...Loading!! please wait while we get it....</h1>
    }

  return (
    <>

    {/* <pre>{JSON.stringify(chartData, null, 2)}</pre>
       */}
    <div className="chart-card" >
      <h2>Bitcoin 30-Day Trend</h2>
      
     
      <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            
            
            <XAxis dataKey="date" />
      
            <YAxis domain={['dataMin', 'dataMax']} />
    
            <Tooltip />
     
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.3} 
            />
            
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  
    </>
  )
}

export default App

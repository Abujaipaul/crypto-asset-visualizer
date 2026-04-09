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

  // 1. We dive into data.prices and use .map() to loop through the array of arrays
  const cleanChartData = data.prices.map((item) => {
    
    // item[0] is the ugly timestamp, item[1] is the price
    const timestamp = item[0];
    const coinPrice = item[1].toFixed(0);

    // 2. We format the timestamp into a beautiful string (e.g., "Oct 1")
    const formattedDate = new Date(timestamp).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });

    // 3. We return a clean OBJECT for Recharts to read
    return {
      date: formattedDate,
      price: coinPrice
    };
  });

  // 4. We save our brand new, clean array into the state!
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h2>Bitcoin 30-Day Trend</h2>
      
      {/* The Container gives the chart a fixed height to live inside */}
      <div style={{ width: '100%', height: '400px', marginTop: '20px' }}>
        
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            
            {/* The X-Axis maps to our formatted dates (e.g., "Oct 1") */}
            <XAxis dataKey="date" />
            
            {/* The Y-Axis. The domain makes sure the chart doesn't start at $0, 
                so we can actually see the price bumps! */}
            <YAxis domain={['dataMin', 'dataMax']} />
            
            {/* The Tooltip gives us that interactive hover effect */}
            <Tooltip />
            
            {/* The actual line/area being drawn, mapped to our price */}
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              fill="#3b82f6" 
              fillOpacity={0.3} 
            />
            
          </AreaChart>
        </ResponsiveContainer>

      </div>
    </div>
  )
    </>
  )
}

export default App

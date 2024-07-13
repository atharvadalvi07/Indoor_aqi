const getGuidelineColor = (value, paramName, guideline) => {
    const colorRanges = {
      ISHRAE_A: {
        pm25: [
          { range: [0, 15], color: "#00B050" },
          { range: [15.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
          { range: [0, 600], color: "#00B050" },
          { range: [600.01, 800], color: "#FFA500" },
          { range: [800.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 200], color:'#00B050'},
            {range: [200.1, 300], color:'#FF6347' },
            {range: [300.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      ISHRAE_B: {
        pm25: [
          { range: [0, 25], color: "#00B050" },
          { range: [25.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
          { range: [0, 800], color: "#00B050" },
          { range: [800.01, 1000], color: "#FFA500" },
          { range: [1000.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 400], color:'#00B050'},
            {range: [400.1, 500], color:'#FF6347' },
            {range: [500.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      ISHRAE_C: {
        pm25: [
          { range: [0, 25], color: "#00B050" },
          { range: [25.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
          { range: [0, 1200], color: "#00B050" },
          { range: [1200.01, 1500], color: "#FFA500" },
          { range: [1500.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },   
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 500], color:'#00B050'},
            {range: [500.1, 600], color:'#FF6347' },
            {range: [600.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      LEED_min: {
        pm25: [
          { range: [0, 15], color: "#00B050" },
          { range: [15.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 1000], color: "#00B050" },
            { range: [1000.01, 1200], color: "#FFA500" },
            { range: [1200.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 100], color:'#00B050'},
            {range: [100.1, 250], color:'#FF6347' },
            {range: [250.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      LEED_EN: {
        pm25: [
          { range: [0, 12], color: "#00B050" },
          { range: [12.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
          { range: [0, 800], color: "#00B050" },
          { range: [800.01, 1000], color: "#FFA500" },
          { range: [1000.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 100], color:'#00B050'},
            {range: [100.1, 250], color:'#FF6347' },
            {range: [250.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      RESET_min: {
        pm25: [
          { range: [0, 35], color: "#00B050" },
          { range: [35.01, 50], color: "#FFA500" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 1000], color: "#00B050" },
            { range: [1000.01, 1200], color: "#FFA500" },
            { range: [1200.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
        tvoc: [
            {range: [0, 500], color:'#00B050'},
            {range: [500.1, 600], color:'#FF6347' },
            {range: [600.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      RESET_hp: {
        pm25: [
            { range: [0, 25], color: "#00B050" },
            { range: [25.01, 30], color: "#FFA500" },
            { range: [30.01, 50], color: "#FF5733" },
            { range: [50.01, 100], color: "#FF5733" },
            { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 600], color: "#00B050" },
            { range: [600.01, 800], color: "#FFA500" },
            { range: [800.01, Infinity], color: "#FF0000" },
          ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
        tvoc: [
            {range: [0, 400], color:'#00B050'},
            {range: [400.1, 500], color:'#FF6347' },
            {range: [500.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      IGBC: {
        pm25: [
            { range: [0, 25], color: "#00B050" },
            { range: [25.01, 30], color: "#FFA500" },
            { range: [30.01, 50], color: "#FF5733" },
            { range: [50.01, 100], color: "#FF5733" },
            { range: [100.01, Infinity], color: "#FF6347" },
          ],
        co2: [
          { range: [0, 800], color: "#00B050" },
          { range: [800.01, 1000], color: "#FFA500" },
          { range: [1000.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
        tvoc: [
            {range: [0, 500], color:'#00B050'},
            {range: [500.1, 600], color:'#FF6347' },
            {range: [600.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      ASHRAE: {
        pm25: [
          { range: [0, 15], color: "#00B050" },
          { range: [15.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 1000], color: "#00B050" },
            { range: [1000.01, 1200], color: "#FFA500" },
            { range: [1200.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 100], color:'#00B050'},
            {range: [100.1, 250], color:'#FF6347' },
            {range: [250.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      NBC_INDIA: {
        pm25: [
          { range: [0, 15], color: "#00B050" },
          { range: [15.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 1000], color: "#00B050" },
            { range: [1000.01, 1200], color: "#FFA500" },
            { range: [1200.01, Infinity], color: "#FF0000" },
        ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
          tvoc: [
            {range: [0, 600], color:'#00B050'},
            {range: [600.1, 700], color:'#FF6347' },
            {range: [700.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
      WELL: {
        pm25: [
          { range: [0, 15], color: "#00B050" },
          { range: [15.01, 30], color: "#FFA500" },
          { range: [30.01, 50], color: "#FF5733" },
          { range: [50.01, 100], color: "#FF5733" },
          { range: [100.01, Infinity], color: "#FF6347" },
        ],
        co2: [
            { range: [0, 800], color: "#00B050" },
            { range: [800.01, 1000], color: "#FFA500" },
            { range: [1000.01, Infinity], color: "#FF0000" },
          ],
        temp: [
            { range: [0, 23], color: "#04D9FF" },
            { range: [23.01, 27], color: "#00B050" },
            { range: [27.01, 28], color: "#FF6347" },
            { range: [28.01, Infinity], color: "#FF0000" },
        ],
          humidity: [
            { range: [0, 30], color: "#04D9FF" },
            { range: [30.01, 50], color: "#00B050" },
            { range: [50.01, 70], color: "#FFA500" },
            { range: [70.01, 100], color: "#FF0000"},
        ],    
        tvoc: [
            {range: [0, 500], color:'#00B050'},
            {range: [500.1, 600], color:'#FF6347' },
            {range: [600.1, Infinity], color:'#FF0000'}
        ],
          iew: [
            {range: [0,70], color:'#EF3340'},
            {range: [70.1, 80], color:'#FF8200'},
            {range: [80.1, 90], color:'#FFA500'},
            {range: [90.1, 100], color:'#00B050'}
          ],
      },
    };
  
    if (value === null) {
      return "black";
    }
  
    const guidelineRanges = colorRanges[guideline];
    if (!guidelineRanges) {
      return "black";
    }
  
    const ranges = guidelineRanges[paramName];
    if (!ranges) {
      return "black";
    }
  
    for (const range of ranges) {
      const [min, max] = range.range;
      if (value >= min && value <= max) {
        return range.color;
      }
    }
  
    return "black"; 
  };
  
  export default getGuidelineColor;
  
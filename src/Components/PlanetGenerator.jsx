import React, { useState, useEffect } from 'react';

const PlanetGenerator = () => {
  const [planetSize, setPlanetSize] = useState(10000);
  const [climateType, setClimateType] = useState('');
  const [starType, setStarType] = useState('');
  const [distanceFromStar, setDistanceFromStar] = useState(1);
  const [n2, setN2] = useState(50);
  const [o2, setO2] = useState(50);
  const [co2, setCo2] = useState(50);
  const [dayLength, setDayLength] = useState(24);
  const [yearLength, setYearLength] = useState(365);
  const [axialTilt, setAxialTilt] = useState(23.5);
  const [timeline, setTimeline] = useState(8);
  const [answerText, setAnswerText] = useState('Generating...');

  useEffect(() => {
    if (starType) {
      updateDistanceRange();
    }
  }, [starType]);

  const updateDistanceRange = () => {
    if (starType === 'Sun') {
      setDistanceFromStar(1.2);
    } else if (starType === 'Dwarf') {
      setDistanceFromStar(0.2);
    }
  };

  const generatePlanet = async () => {
    if (!climateType || !starType) {
      alert("Error: Please complete each field.");
      return;
    }

    const planetInfo = `
      Planet Size (Diameter): ${planetSize} Km
      Climate Type: ${climateType}
      Type of Star: ${starType}
      Distance from Star (AU): ${distanceFromStar}
      Atmosphere:
      N2: ${n2}%
      O2: ${o2}%
      CO2: ${co2}%
      Day Length (Earth Hours): ${dayLength}
      Year Length (Earth Days): ${yearLength}
      Axial Tilt (Degrees): ${axialTilt}°
      Timeline: ${timeline} Billion Years
    `;
    console.log(planetInfo);

    try {
      const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `You are an astrobiologist. You are extremely passionate about explaining what life on other planets could look like and have been commissioned to do so. You will be given information about a hypothetical planet and will use this information, along with your extensive knowledge base, to provide a thorough description, approximately 5000 words, about what forms of life could be found on that planet. Please describe in vivid detail 5 alien species. Put emphasis on their physical appearances and how they coexist with each other. You are a skilled orator, and your description of the lifeforms will resemble the style of a David Attenborough nature documentary. Your goal is to intrigue users and stimulate their imaginations while adhering to scientific accuracy. The information below can be used to infer other information including but not limited to gravitational strength, whether a planet is tidally locked, and the presence of moons and magnetic fields. Atmosphere composition is in approximate relative values where 0 is low and 100 is high, and we can assume the presence of other relevant gasses. N2 is Nitrogen, O2 Oxygen, and CO2 Carbon dioxide. Timeline is simply the age of the planet. Take all these factors into consideration. If any data input seems to be impossible even in the hypothetical realm, you may adjust to a slightly more plausible scenario and include a brief disclaimer at the end of the output. Here is the information about the planet you have been commissioned to work with: \n${planetInfo}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setAnswerText(text);
    } catch (error) {
      console.error("Error:", error);
      setAnswerText("Failed to generate planet. Please try again later.");
    }
  };

  return (
    <div className='whitesmoke'>
      <div>
        <div>
          <h1>Close Encounters:</h1>
          <h2>Visions of Life Beyond Earth</h2>
          <p>Adjust the variables below to see what life could potentially inhabit such a planet.</p>

          <div className='input-group'>
            <p>Planet Size (Diameter) Km:</p>
            <input
              type="range"
              min="5000"
              max="20000"
              value={planetSize}
              className="slider"
              onChange={(e) => setPlanetSize(Number(e.target.value))}
            />
            <span>{planetSize} Km</span>
          </div>

          <div className='input-group'>
            <p>Climate Type:</p>
            <input
              type="radio"
              name="climateType"
              value="Tropical"
              checked={climateType === 'Tropical'}
              onChange={(e) => setClimateType(e.target.value)}
            /> Tropical
            <input
              type="radio"
              name="climateType"
              value="Arid"
              checked={climateType === 'Arid'}
              onChange={(e) => setClimateType(e.target.value)}
            /> Arid
            <input
              type="radio"
              name="climateType"
              value="Temperate"
              checked={climateType === 'Temperate'}
              onChange={(e) => setClimateType(e.target.value)}
            /> Temperate
            <input
              type="radio"
              name="climateType"
              value="Polar"
              checked={climateType === 'Polar'}
              onChange={(e) => setClimateType(e.target.value)}
            /> Polar
          </div>

          <div className='input-group'>
            <p>Type of Star:</p>
            <input
              type="radio"
              name="starType"
              value="Sun"
              checked={starType === 'Sun'}
              onChange={(e) => setStarType(e.target.value)}
            /> Main Sequence (Sun-like)
            <input
              type="radio"
              name="starType"
              value="Dwarf"
              checked={starType === 'Dwarf'}
              onChange={(e) => setStarType(e.target.value)}
            /> Red Dwarf (Cooler)
          </div>

          <div className='input-group'>
            <p>Distance from Star:</p>
            <input
              type="range"
              min="0.9"
              max="1.5"
              value={distanceFromStar}
              step="0.1"
              className="slider"
              onChange={(e) => setDistanceFromStar(Number(e.target.value))}
            />
            <span>{distanceFromStar} AU</span>
          </div>
        </div>

        <div className='project-box'>
          <div className='input-group'>
            <p>Atmosphere (Composition %):</p>
            <label htmlFor="myRangeN2">N2:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={n2}
              className="slider"
              onChange={(e) => setN2(Number(e.target.value))}
            />
            <span>{n2}%</span>
            <br />
            <label htmlFor="myRangeO2">O2:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={o2}
              className="slider"
              onChange={(e) => setO2(Number(e.target.value))}
            />
            <span>{o2}%</span>
            <br />
            <label htmlFor="myRangeCO2">CO2:</label>
            <input
              type="range"
              min="0"
              max="100"
              value={co2}
              className="slider"
              onChange={(e) => setCo2(Number(e.target.value))}
            />
            <span>{co2}%</span>
          </div>

          <div className='input-group'>
            <p>Day Length (Earth Hours):</p>
            <input
              type="range"
              min="1"
              max="48"
              value={dayLength}
              className="slider"
              onChange={(e) => setDayLength(Number(e.target.value))}
            />
            <span>{dayLength} hours</span>
          </div>

          <div className='input-group'>
            <p>Year Length (Earth Days):</p>
            <input
              type="range"
              min="1"
              max="1000"
              value={yearLength}
              className="slider"
              onChange={(e) => setYearLength(Number(e.target.value))}
            />
            <span>{yearLength} days</span>
          </div>

          <div className='input-group'>
            <p>Axial Tilt (Degrees):</p>
            <input
              type="range"
              min="0"
              max="90"
              value={axialTilt}
              className="slider"
              onChange={(e) => setAxialTilt(Number(e.target.value))}
            />
            <span>{axialTilt}°</span>
          </div>

          <div className='input-group'>
            <p>Timeline (Billion Years):</p>
            <input
              type="range"
              min="4"
              max="12"
              value={timeline}
              step="0.1"
              className="slider"
              onChange={(e) => setTimeline(Number(e.target.value))}
            />
            <span>{timeline} billion years</span>
          </div>

          <button onClick={generatePlanet}>Generate Planet</button>
          <div id="answer">
            <h3>Results:</h3>
            <p>{answerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetGenerator;
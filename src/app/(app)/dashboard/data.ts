
export const weatherData = [
  { day: 'Today', icon: "Partly Cloudy", temp: '31°C', condition: 'A mix of sun and clouds.', wind: '14 km/h' },
  { day: 'Tomorrow', icon: "Light Rain", temp: '28°C', condition: 'Light showers expected in the afternoon.', wind: '18 km/h' },
  { day: 'Day After', icon: "Sunny", temp: '33°C', condition: 'Clear skies and sunny.', wind: '10 km/h' },
];

export const weatherScenarios = [
  // Scenario 1: Standard Sunny
  [
    { day: 'Today', icon: "Sunny", temp: '32°C', condition: 'Clear and sunny skies.', wind: '10 km/h' },
    { day: 'Tomorrow', icon: "Sunny", temp: '33°C', condition: 'Continued sunshine.', wind: '12 km/h' },
    { day: 'Day After', icon: "Partly Cloudy", temp: '31°C', condition: 'A few clouds appearing.', wind: '15 km/h' },
  ],
  // Scenario 2: Approaching Rain
  [
    { day: 'Today', icon: "Partly Cloudy", temp: '30°C', condition: 'Clouds building up.', wind: '18 km/h' },
    { day: 'Tomorrow', icon: "Cloudy", temp: '29°C', condition: 'Overcast and humid.', wind: '20 km/h' },
    { day: 'Day After', icon: "Heavy Rain", temp: '27°C', condition: 'Heavy rainfall expected.', wind: '25 km/h' },
  ],
  // Scenario 3: Monsoon Shower
  [
    { day: 'Today', icon: "Light Rain", temp: '28°C', condition: 'Light showers throughout the day.', wind: '17 km/h' },
    { day: 'Tomorrow', icon: "Thunderstorm", temp: '26°C', condition: 'Risk of thunderstorms.', wind: '22 km/h' },
    { day: 'Day After', icon: "Partly Cloudy", temp: '29°C', condition: 'Clearing up.', wind: '16 km/h' },
  ],
  // Scenario 4: Windy days
  [
    { day: 'Today', icon: "Sunny", temp: '31°C', condition: 'Sunny but windy.', wind: '25 km/h' },
    { day: 'Tomorrow', icon: "Partly Cloudy", temp: '30°C', condition: 'Windy with some clouds.', wind: '28 km/h' },
    { day: 'Day After', icon: "Sunny", temp: '32°C', condition: 'Wind easing, clear skies.', wind: '15 km/h' },
  ],
  // Scenario 5: Hot and Humid
  [
    { day: 'Today', icon: "Sunny", temp: '34°C', condition: 'Hot and humid.', wind: '8 km/h' },
    { day: 'Tomorrow', icon: "Sunny", temp: '35°C', condition: 'Very hot.', wind: '7 km/h' },
    { day: 'Day After', icon: "Thunderstorm", temp: '30°C', condition: 'Afternoon thunderstorms likely.', wind: '20 km/h' },
  ],
  // Scenario 6: Overcast Week
  [
    { day: 'Today', icon: "Cloudy", temp: '29°C', condition: 'Fully overcast.', wind: '14 km/h' },
    { day: 'Tomorrow', icon: "Cloudy", temp: '28°C', condition: 'Gray skies continue.', wind: '15 km/h' },
    { day: 'Day After', icon: "Light Rain", temp: '27°C', condition: 'Drizzle and light rain.', wind: '18 km/h' },
  ],
  // Scenario 7: Foggy Morning
  [
    { day: 'Today', icon: "Fog", temp: '25°C', condition: 'Fog in the morning, clearing to sun.', wind: '9 km/h' },
    { day: 'Tomorrow', icon: "Sunny", temp: '31°C', condition: 'Clear and sunny.', wind: '11 km/h' },
    { day: 'Day After', icon: "Sunny", temp: '32°C', condition: 'Bright sunshine.', wind: '13 km/h' },
  ],
  // Scenario 8: Cool and Pleasant
  [
    { day: 'Today', icon: "Partly Cloudy", temp: '28°C', condition: 'Pleasant with a light breeze.', wind: '16 km/h' },
    { day: 'Tomorrow', icon: "Sunny", temp: '29°C', condition: 'Perfect sunny weather.', wind: '14 km/h' },
    { day: 'Day After', icon: "Sunny", temp: '30°C', condition: 'Warm and clear.', wind: '12 km/h' },
  ],
  // Scenario 9: Stormy Weather
  [
    { day: 'Today', icon: "Thunderstorm", temp: '27°C', condition: 'Thunderstorms and heavy wind.', wind: '30 km/h' },
    { day: 'Tomorrow', icon: "Heavy Rain", temp: '26°C', condition: 'Continuous heavy rain.', wind: '28 km/h' },
    { day: 'Day After', icon: "Light Rain", temp: '27°C', condition: 'Rain easing to showers.', wind: '20 km/h' },
  ],
  // Scenario 10: Mixed Bag
  [
    { day: 'Today', icon: "Sunny", temp: '33°C', condition: 'Sunny morning, clouds in evening.', wind: '15 km/h' },
    { day: 'Tomorrow', icon: "Light Rain", temp: '29°C', condition: 'Morning showers.', wind: '19 km/h' },
    { day: 'Day After', icon: "Partly Cloudy", temp: '31°C', condition: 'Mix of sun and clouds.', wind: '16 km/h' },
  ],
];

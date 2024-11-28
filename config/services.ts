// Define the interface for the configuration structure
interface Config {
  apiBaseUrl: string;
}

// Define the development configuration object
const devConfig: Config = {
  apiBaseUrl: "https://localhost:7006",
};

// Define the production configuration object
const prodConfig: Config = {
  apiBaseUrl: "https://api.yourdomain.com",
};

// Dynamically select the configuration based on the environment
const config: Config =
  process.env.NODE_ENV === "production" ? prodConfig : devConfig;

console.log("Current environment:", process.env.NODE_ENV);

// Export the configuration
export default config;


export default {
  sidebar: {
    dashboard: 'Dashboard',
    crop_doctor: 'Crop Doctor',
    calculator: 'Calculator',
    market_prices: 'Market Prices',
    soil_suitability: 'Soil Suitability',
    my_fields: 'My Fields',
    reminders: 'Reminders',
    sms_reminders: 'SMS Reminders',
    community: 'Community',
    ai_chatbot: 'AI Chatbot',
    our_profile: 'Our Profile',
  },
  dashboard: {
    welcome: 'Hello community',
    description: 'Your AI-powered partner in modern agriculture.',
    weather_forecast: {
      title: 'Weather Forecast',
      placeholder: 'Enter your location',
      button: 'Search',
    },
    crop_doctor: {
      title: 'Crop Doctor',
      description: 'Diagnose plant diseases by uploading a photo.',
      button: 'Diagnose Now'
    },
    fertilizer_calculator: {
      title: 'Fertilizer Calculator',
      description: 'Calculate optimal fertilizer usage for your crops.',
      button: 'Calculate Now',
    },
    market_prices: {
      title: 'Market Prices',
      description: 'Get real-time market prices for your crops.',
      button: 'View Prices',
    },
    soil_suitability: {
      title: 'Soil Suitability',
      description: 'Check soil suitability for your crops.',
      button: 'Check Now',
    },
    my_fields: {
      title: 'My Fields',
      description: 'Manage your fields and track crops.',
      button: 'Manage Fields',
    },
    reminders: {
      title: 'Reminders',
      description: 'Set and manage your farming reminders.',
      button: 'Set Reminders',
    },
    sms_reminders: {
      title: 'SMS Reminders',
      description: 'Manage your SMS reminder preferences.',
      button: 'Manage SMS',
    },
    community_hub: {
      title: 'Community Hub',
      description: 'Connect with other farmers and experts.',
      button: 'Join Discussion',
    },
    ai_assistant: {
      title: 'AI Assistant',
      description: 'Ask our AI for expert advice on any topic.',
      button: 'Start Chatting',
    },
  },
  market_prices: {
    title: 'Market Prices',
    description:
      'Live commodity prices from your local market (Data is for demonstration).',
    table: {
      crop_name: 'Crop Name',
      price: 'Price',
      trend: 'Trend (24h)',
    },
    crops: {
      wheat: 'Wheat (Quintal)',
      paddy: 'Paddy (Quintal)',
      maize: 'Maize (Quintal)',
      sugarcane: 'Sugarcane (Tonne)',
      cotton: 'Cotton (Quintal)',
      soybean: 'Soybean (Quintal)',
      tomato: 'Tomato (Kg)',
      onion: 'Onion (Kg)',
      mustard: 'Mustard (Quintal)',
      gram: 'Gram (Quintal)',
      lentil: 'Lentil (Quintal)',
      turmeric: 'Turmeric (Quintal)',
    },
  },
  community: {
    title: 'Community Hub',
    description: 'Ask questions, share knowledge, and connect with fellow farmers.',
    post_placeholder: "What's on your mind? Ask a question or share an update...",
    post_button: 'Post',
    likes: 'Likes',
    comments: 'Comments',
    just_now: 'Just now',
    categories: {
        crop: "Crop",
        labor: "Labor",
        equipments: "Equipments",
        feedback: "Feedback",
        "q&a": "Q&A"
    }
  },
  chatbot: {
    title: 'AI Chatbot',
    description: 'Your personal AI assistant.',
    greeting: 'Hello! I am your personal AI assistant. How can I help you today?',
    input_placeholder: 'Ask me anything...',
    send_button_sr: 'Send',
    error_message: "Sorry, I couldn't process your request. Please try again.",
    no_answer: "I don't have an answer for that.",
    toast: {
      error_title: 'An error occurred',
    },
  },
  fertilizer_calculator: {
    title: 'Fertilizer Calculator',
    description: 'Estimate your fertilizer needs and potential profits.',
    card1: {
      title: 'Crop & Area',
      description: 'Select your crop and enter the area you are planting.',
      crop_label: 'Crop Name',
      crop_placeholder: 'Select a crop',
      area_label: 'Area (in acres)',
      button: 'Calculate',
    },
    card2: {
      title: 'Results & Recommendations',
      description_initial: 'Enter crop and area to see recommendations.',
      description_results_prefix: 'Based on your selection (',
      description_results_suffix: ' acres).',
      initial_text: 'Your results will appear here.',
      recommendation_title: 'Recommended Fertilizer',
      acre: 'acre',
      suitability_title: 'Soil Suitability',
      profit_title: 'Estimated Profit',
      profit_label: 'Total Profit / Acre',
    },
  },
  my_fields: {
    title: 'My Fields',
    description:
      'Get AI-powered advice for your crops based on detailed field data.',
    advice_error: 'Could not retrieve advice at this time.',
    card1: {
      title: 'Field Data',
      description:
        'Enter the details for your field to get personalized advice.',
      crop_label: 'Crop Name',
      crop_placeholder: 'e.g., Wheat',
      stage_label: 'Growth Stage',
      stage_placeholder: 'e.g., Flowering',
      moisture_label: 'Soil Moisture (%)',
      ph_label: 'Soil pH',
      npk_label: 'NPK Levels (kg/ha)',
      button: 'Get Advice',
      save_button: 'Save Field',
    },
    card2: {
      title: 'Management Advice',
      description_initial: 'Advice based on your field data will appear here.',
      description_results: 'Here is your personalized advice:',
      initial_text: 'Enter your field details to get management advice.',
    },
    toast: {
        saved: {
            title: "Field Saved",
            description: "Your field with {crop} has been saved.",
        }
    }
  },
  profile: {
    title: 'Our Profile',
    description: 'Manage your account settings and personal information.',
    card1: {
      title: 'Personal Information',
      description: 'Update your name and phone number.',
      name_label: 'Full Name',
      phone_label: 'Phone Number',
      button: 'Save Changes',
    },
    card2: {
      title: 'Notifications',
      description: 'Manage how you receive notifications from the app.',
      sms_title: 'SMS Reminders',
      sms_description: 'Receive reminders for fertilizer application.',
    },
    toast: {
      title: 'Profile Updated',
      description: 'Your information has been successfully saved.',
    },
  },
  reminders: {
    title: 'Reminders',
    description: 'Set and manage your farming reminders.',
    card1: {
      title: 'Add New Reminder',
      description: 'Schedule a new task for your farm.',
      task_label: 'Task Description',
      task_placeholder: 'e.g., Irrigate the maize field',
      date_label: 'Date',
      button: 'Add Reminder',
    },
    card2: {
      title: 'Upcoming Reminders',
      description: 'Your scheduled tasks are listed here.',
      no_reminders: 'You have no upcoming reminders.',
      delete_button_sr: 'Delete reminder',
    },
    toast: {
      missing_info: {
        title: 'Missing Information',
        description: 'Please enter a task and select a date.',
      },
      added: {
        title: 'Reminder Added',
        description_prefix: 'Task',
        description_suffix: 'scheduled for',
      },
      removed: {
        title: 'Reminder Removed',
      },
    },
  },
  sms_reminders: {
    title: 'SMS Reminders',
    description: 'Manage your SMS and WhatsApp reminder preferences.',
    card: {
      title: 'Notification Channels',
      description: 'Choose how you want to receive reminders.',
      sms_title: 'SMS Reminders',
      sms_description: 'Receive reminders via standard text messages.',
      whatsapp_title: 'WhatsApp Reminders',
      whatsapp_description: 'Receive reminders on WhatsApp.',
      button: 'Save Preferences',
    },
    toast: {
      title: 'Preferences Saved',
      description: 'Your notification settings have been updated.',
    },
  },
  soil_suitability: {
    title: 'Soil Suitability',
    description: 'Check if your soil is suitable for a specific crop.',
    card1: {
      title: 'Crop & Soil',
      description: 'Select a crop and your soil type to check for suitability.',
      crop_label: 'Crop Name',
      crop_placeholder: 'Select a crop',
      soil_label: 'Soil Type',
      soil_placeholder: 'Select a soil type',
      button: 'Check Suitability',
    },
    card2: {
      title: 'Suitability Report',
      description_initial: 'Results will be displayed here.',
      description_results_prefix: 'Analysis for',
      description_results_suffix: 'on {soil} soil.',
      initial_text: 'Your report will appear here.',
      recommendations_title: 'Recommendations',
      ideal_conditions_title: 'Ideal Conditions',
      rainfall: 'Rainfall',
      temp: 'Temp',
      ph: 'pH',
      sunlight: 'Sunlight',
    },
  },
  crop_doctor: {
    title: 'Crop Doctor',
    description: 'Upload a photo of a plant leaf to diagnose diseases or deficiencies.',
    card1: {
        title: 'Upload Image',
        description: "Select an image of a plant leaf that appears unhealthy.",
        image_label: "Plant Image",
        button: "Analyze Plant"
    },
    card2: {
        title: "Diagnosis Report",
        description_initial: "Your diagnosis will appear here.",
        description_results: "Here is the analysis of your plant image.",
        initial_text: "Upload an image to get started.",
        loading_title: "Analyzing Image...",
        loading_description: "Our AI is inspecting your plant. This may take a moment.",
        not_plant_title: "Not a Plant",
        confidence_label: "Confidence",
        recommendations_title: "Recommendations"
    },
    toast: {
        error_title: "Analysis Failed",
        error_description: "We could not analyze the image. Please try again."
    }
  }
} as const;

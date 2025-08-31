
export default {
  sidebar: {
    dashboard: 'डैशबोर्ड',
    calculator: 'कैलकुलेटर',
    market_prices: 'बाजार मूल्य',
    soil_suitability: 'मिट्टी की उपयुक्तता',
    my_fields: 'मेरे खेत',
    reminders: 'अनुस्मारक',
    sms_reminders: 'SMS अनुस्मारक',
    community: 'समुदाय',
    ai_chatbot: 'AI चैटबॉट',
    our_profile: 'हमारी प्रोफ़ाइल',
  },
  dashboard: {
    welcome: 'नमस्ते समुदाय',
    description: 'आधुनिक कृषि में आपका AI-संचालित भागीदार।',
    weather_forecast: {
      title: 'मौसम पूर्वानुमान',
      placeholder: 'अपना स्थान दर्ज करें',
      button: 'खोजें',
    },
    fertilizer_calculator: {
      title: 'उर्वरक कैलकुलेटर',
      description: 'अपनी फसलों के लिए इष्टतम उर्वरक उपयोग की गणना करें।',
      button: 'अभी गणना करें',
    },
    market_prices: {
      title: 'बाजार मूल्य',
      description: 'अपनी फसलों के लिए वास्तविक समय बाजार मूल्य प्राप्त करें।',
      button: 'मूल्य देखें',
    },
    soil_suitability: {
      title: 'मिट्टी की उपयुक्तता',
      description: 'अपनी फसलों के लिए मिट्टी की उपयुक्तता की जाँच करें।',
      button: 'अभी जाँच करें',
    },
    my_fields: {
      title: 'मेरे खेत',
      description: 'अपने खेतों का प्रबंधन करें और फसलों पर नज़र रखें।',
      button: 'खेतों का प्रबंधन करें',
    },
    reminders: {
      title: 'अनुस्मारक',
      description: 'अपने खेती के अनुस्मारक सेट और प्रबंधित करें।',
      button: 'अनुस्मारक सेट करें',
    },
    sms_reminders: {
      title: 'SMS अनुस्मारक',
      description: 'अपनी SMS अनुस्मारक प्राथमिकताएँ प्रबंधित करें।',
      button: 'SMS प्रबंधित करें',
    },
    community_hub: {
      title: 'सामुदायिक केंद्र',
      description: 'अन्य किसानों और विशेषज्ञों से जुड़ें।',
      button: 'चर्चा में शामिल हों',
    },
    ai_assistant: {
      title: 'AI सहायक',
      description: 'किसी भी विषय पर विशेषज्ञ सलाह के लिए हमारे AI से पूछें।',
      button: 'चैटिंग शुरू करें',
    },
  },
  market_prices: {
    title: 'बाजार मूल्य',
    description:
      'आपके स्थानीय बाजार से लाइव कमोडिटी की कीमतें (डेटा प्रदर्शन के लिए है)।',
    table: {
      crop_name: 'फसल का नाम',
      price: 'कीमत',
      trend: 'रुझान (24 घंटे)',
    },
    crops: {
      wheat: 'गेहूँ (क्विंटल)',
      paddy: 'धान (क्विंटल)',
      maize: 'मक्का (क्विंटल)',
      sugarcane: 'गन्ना (टन)',
      cotton: 'कपास (क्विंटल)',
      soybean: 'सोयाबीन (क्विंटल)',
      tomato: 'टमाटर (किलो)',
      onion: 'प्याज (किलो)',
      mustard: 'सरसों (क्विंटल)',
      gram: 'चना (क्विంటल)',
      lentil: 'मसूर (क्विंटल)',
      turmeric: 'हल्दी (क्विंटल)',
    },
  },
  community: {
    title: 'सामुदायिक केंद्र',
    description: 'प्रश्न पूछें, ज्ञान साझा करें, और साथी किसानों से जुड़ें।',
    post_placeholder: 'आपके मन में क्या है? एक प्रश्न पूछें या एक अपडेट साझा करें...',
    post_button: 'पोस्ट',
    likes: 'लाइक',
    comments: 'टिप्पणियाँ',
    just_now: 'अभी-अभी',
    categories: {
        crop: "फसल",
        labor: "श्रम",
        equipments: "उपकरण",
        feedback: "प्रतिक्रिया",
        "q&a": "प्रश्न और उत्तर"
    }
  },
  chatbot: {
    title: 'AI चैटबॉट',
    description: 'आपका व्यक्तिगत AI सहायक।',
    greeting: 'नमस्ते! मैं आपका व्यक्तिगत AI सहायक हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?',
    input_placeholder: 'मुझसे कुछ भी पूछें...',
    send_button_sr: 'भेजें',
    error_message: 'क्षमा करें, मैं आपके अनुरोध को संसाधित नहीं कर सका। कृपया पुनः प्रयास करें।',
    no_answer: 'मेरे पास इसका कोई जवाब नहीं है।',
    toast: {
      error_title: 'एक त्रुटि हुई',
    },
  },
  fertilizer_calculator: {
    title: 'उर्वरक कैलकुलेटर',
    description: 'अपनी उर्वरक जरूरतों और संभावित मुनाफे का अनुमान लगाएं।',
    card1: {
      title: 'फसल और क्षेत्र',
      description: 'अपनी फसल का चयन करें और वह क्षेत्र दर्ज करें जिसे आप लगा रहे हैं।',
      crop_label: 'फसल का नाम',
      crop_placeholder: 'एक फसल चुनें',
      area_label: 'क्षेत्र (एकड़ में)',
      button: 'गणना करें',
    },
    card2: {
      title: 'परिणाम और सिफारिशें',
      description_initial: 'सिफारिशों को देखने के लिए फसल और क्षेत्र दर्ज करें।',
      description_results_prefix: 'आपके चयन के आधार पर (',
      description_results_suffix: ' एकड़)।',
      initial_text: 'आपके परिणाम यहां दिखाई देंगे।',
      recommendation_title: 'अनुशंसित उर्वरक',
      acre: 'एकड़',
      suitability_title: 'मिट्टी की उपयुक्तता',
      profit_title: 'अनुमानित लाभ',
      profit_label: 'कुल लाभ / एकड़',
    },
  },
  my_fields: {
    title: 'मेरे खेत',
    description:
      'विस्तृत क्षेत्र डेटा के आधार पर अपनी फसलों के लिए AI-संचालित सलाह प्राप्त करें।',
    advice_error: 'इस समय सलाह प्राप्त नहीं की जा सकी।',
    card1: {
      title: 'खेत का डेटा',
      description:
        'व्यक्तिगत सलाह प्राप्त करने के लिए अपने खेत का विवरण दर्ज करें।',
      crop_label: 'फसल का नाम',
      crop_placeholder: 'जैसे, गेहूँ',
      stage_label: 'विकास अवस्था',
      stage_placeholder: 'जैसे, फूल आना',
      moisture_label: 'मिट्टी की नमी (%)',
      ph_label: 'मिट्टी का पीएच',
      npk_label: 'एनपीके स्तर (किग्रा/हेक्टेयर)',
      button: 'सलाह लें',
      save_button: 'खेत सहेजें',
    },
    card2: {
      title: 'प्रबंधन सलाह',
      description_initial: 'आपके खेत के डेटा के आधार पर सलाह यहां दिखाई देगी।',
      description_results: 'यहां आपकी व्यक्तिगत सलाह है:',
      initial_text: 'प्रबंधन सलाह प्राप्त करने के लिए अपने खेत का विवरण दर्ज करें।',
    },
    toast: {
        saved: {
            title: "खेत सहेजा गया",
            description: "आपका {crop} वाला खेत सहेज लिया गया है।",
        }
    }
  },
  profile: {
    title: 'हमारी प्रोफ़ाइल',
    description: 'अपनी खाता सेटिंग्स और व्यक्तिगत जानकारी प्रबंधित करें।',
    card1: {
      title: 'व्यक्तिगत जानकारी',
      description: 'अपना नाम और फ़ोन नंबर अपडेट करें।',
      name_label: 'पूरा नाम',
      phone_label: 'फ़ोन नंबर',
      button: 'बदलाव सहेजें',
    },
    card2: {
      title: 'सूचनाएं',
      description: 'ऐप से सूचनाएं कैसे प्राप्त करें, इसे प्रबंधित करें।',
      sms_title: 'SMS अनुस्मारक',
      sms_description: 'उर्वरक आवेदन के लिए अनुस्मारक प्राप्त करें।',
    },
    toast: {
      title: 'प्रोफ़ाइल अपडेट किया गया',
      description: 'आपकी जानकारी सफलतापूर्वक सहेज ली गई है।',
    },
  },
  reminders: {
    title: 'अनुस्मारक',
    description: 'अपने खेती के अनुस्मारक सेट और प्रबंधित करें।',
    card1: {
      title: 'नया अनुस्मारक जोड़ें',
      description: 'अपने खेत के लिए एक नया कार्य निर्धारित करें।',
      task_label: 'कार्य विवरण',
      task_placeholder: 'जैसे, मक्के के खेत की सिंचाई करें',
      date_label: 'तारीख',
      button: 'अनुस्मारक जोड़ें',
    },
    card2: {
      title: 'आगामी अनुस्मारक',
      description: 'आपके निर्धारित कार्य यहां सूचीबद्ध हैं।',
      no_reminders: 'आपके पास कोई आगामी अनुस्मारक नहीं है।',
      delete_button_sr: 'अनुस्मारक हटाएं',
    },
    toast: {
      missing_info: {
        title: 'अधूरी जानकारी',
        description: 'कृपया एक कार्य दर्ज करें और एक तारीख चुनें।',
      },
      added: {
        title: 'अनुस्मारक जोड़ा गया',
        description_prefix: 'कार्य',
        description_suffix: 'के लिए निर्धारित',
      },
      removed: {
        title: 'अनुस्मारक हटाया गया',
      },
    },
  },
  sms_reminders: {
    title: 'SMS अनुस्मारक',
    description: 'अपनी SMS और WhatsApp अनुस्मारक प्राथमिकताएँ प्रबंधित करें।',
    card: {
      title: 'सूचना चैनल',
      description: 'चुनें कि आप अनुस्मारक कैसे प्राप्त करना चाहते हैं।',
      sms_title: 'SMS अनुस्मारक',
      sms_description: 'मानक टेक्स्ट संदेशों के माध्यम से अनुस्मारक प्राप्त करें।',
      whatsapp_title: 'WhatsApp अनुस्मारक',
      whatsapp_description: 'WhatsApp पर अनुस्मारक प्राप्त करें।',
      button: 'प्राथमिकताएँ सहेजें',
    },
    toast: {
      title: 'प्राथमिकताएँ सहेजी गईं',
      description: 'आपकी सूचना सेटिंग्स अपडेट कर दी गई हैं।',
    },
  },
  soil_suitability: {
    title: 'मिट्टी की उपयुक्तता',
    description: 'जाँचें कि आपकी मिट्टी किसी विशिष्ट फसल के लिए उपयुक्त है या नहीं।',
    card1: {
      title: 'फसल और मिट्टी',
      description: 'उपयुक्तता की जांच के लिए एक फसल और अपनी मिट्टी का प्रकार चुनें।',
      crop_label: 'फसल का नाम',
      crop_placeholder: 'एक फसल चुनें',
      soil_label: 'मिट्टी का प्रकार',
      soil_placeholder: 'एक मिट्टी का प्रकार चुनें',
      button: 'उपयुक्तता जांचें',
    },
    card2: {
      title: 'उपयुक्तता रिपोर्ट',
      description_initial: 'परिणाम यहां प्रदर्शित किए जाएंगे।',
      description_results_prefix: 'के लिए विश्लेषण',
      description_results_suffix: '{soil} मिट्टी पर।',
      initial_text: 'आपकी रिपोर्ट यहां दिखाई देगी।',
      recommendations_title: 'सिफारिशें',
      ideal_conditions_title: 'आदर्श स्थितियाँ',
      rainfall: 'वर्षा',
      temp: 'तापमान',
      ph: 'पीएच',
      sunlight: 'धूप',
    },
  },
} as const;

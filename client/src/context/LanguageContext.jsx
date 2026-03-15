import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    en: {
      // Navigation & Menu
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      language: 'Language',
      theme: 'Theme',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      hindi: 'हिंदी',
      english: 'English',
      selectLanguage: 'Select Language',
      selectTheme: 'Select Theme',
      
      // Navigation & Sidebar
      dashboard: 'Dashboard',
      newCase: 'New Case',
      doctors: 'Doctors',
      home: 'Home',
      
      // User Dashboard
      myPets: 'My Pets',
      pendingCases: 'Pending Cases',
      consultations: 'Consultations',
      nearbyDoctors: 'Nearby Doctors',
      myCases: 'My Cases',
      myProfile: 'My Profile',
      findDoctors: 'Find Nearby Doctors',
      submitCase: 'Submit New Case',
      uploadReport: 'Upload Report',
      quickActions: 'Quick Actions',
      viewAllCases: 'View All Cases',
      findNearbyDoctors: 'Find Nearby Doctors',
      
      // Profile Page
      manageYourFarmInfo: 'Manage your farm and personal information',
      editProfile: 'Edit Profile',
      save: 'Save',
      cancel: 'Cancel',
      contactInformation: 'Contact Information',
      phone: 'Phone',
      farmInformation: 'Farm Information',
      farmName: 'Farm Name',
      location: 'Location',
      farmSize: 'Farm Size',
      animalCount: 'Animal Count',
      primaryAnimals: 'Primary Animals',
      experience: 'Experience',
      registrationDate: 'Registration Date',
      fullName: 'Full Name',
      
      // MyCases Page
      trackAllAnimalCases: 'Track all your animal health cases and treatments',
      searchByPetNameOrDisease: 'Search by pet name, case ID, or disease...',
      allCases: 'All cases',
      activeCases: 'Active cases',
      pendingCasesText: 'Pending cases',
      resolvedCases: 'Resolved cases',
      disease: 'Disease',
      created: 'Created',
      action: 'Action',
      view: 'View',
      noCasesFound: 'No cases found matching your filters',
      totalCases: 'Total Cases',
      activeCasesCount: 'Active Cases',
      resolvedCasesCount: 'Resolved Cases',
      
      // SubmitCase Page
      submitNewAnimalCase: 'Submit New Animal Health Case',
      provideDetailsAndUploadPhotos: 'Provide details and upload photos for veterinary consultation',
      uploadAnimalImage: 'Upload Animal Image',
      animalType: 'Animal Type',
      selectAnimalType: 'Select animal type',
      breed: 'Breed',
      breedPlaceholder: 'e.g., Holstein, Gir',
      ageYears: 'Age (Years)',
      weightKg: 'Weight (kg)',
      symptoms: 'Symptoms',
      symptomsPlaceholder: 'Describe what symptoms you\'re observing...',
      duration: 'Duration',
      durationPlaceholder: 'e.g., 3 days, 1 week',
      additionalNotes: 'Additional Notes',
      notesPlaceholder: 'Any other relevant information...',
      submitCaseForReview: 'Submit Case for Review',
      submitting: 'Submitting...',
      tipsForBetterResults: 'Tips for Better Results',
      uploadClearWellLit: 'Upload clear, well-lit photos',
      includeMultipleAngles: 'Include multiple angles if possible',
      beDetailedAboutSymptoms: 'Be detailed about symptoms',
      mentionDurationOfIllness: 'Mention duration of illness',
      whatHappensNext: 'What Happens Next',
      aiAnalysisOfImages: 'AI analysis of your images',
      doctorReviewWithin: 'Doctor review (within 2 hours)',
      consultationRecommendation: 'Consultation recommendation',
      treatmentPlanProvided: 'Treatment plan provided',
      caseSubmittedSuccessfully: 'Case Submitted Successfully!',
      vetWillReviewSoon: 'A veterinarian will review your case and contact you soon.',
      clickToUploadOrDrag: 'Click to upload or drag and drop',
      jpgPngUpTo10MB: 'JPG, PNG up to 10MB',
      clickToChangeImage: 'Click to change image',
      
      // Table & Case Details
      caseId: 'Case ID',
      pet: 'Pet',
      doctor: 'Doctor',
      status: 'Status',
      lastUpdate: 'Last Update',
      proTip: '💡 Pro Tip',
      uploadPetHealthRecordsHelp: 'Upload pet health records to help doctors provide better consultation',
      
      // Nearby Doctors
      findVeterinarians: 'Find Nearby Doctors',
      connectWithDoctors: 'Connect with experienced veterinary doctors near you',
      doctorsLocationMap: 'Doctors Location Map',
      clickMarkersForDetails: 'Click on markers to see doctor details',
      searchByDoctorName: 'Search by doctor name, specialty, or location...',
      allSpecialties: 'All Specialties',
      noDoctorsFound: 'No doctors found matching your criteria',
      emergencyVeterinaryCare: 'Need Emergency Veterinary Care?',
      
      // Doctor Details
      experience: 'Experience',
      availability: 'Availability',
      ratingAndReviews: 'Rating and Reviews',
      bookAppointment: 'Book Appointment',
      viewProfile: 'View Profile',
      
      // Settings
      preferences: 'Preferences',
      general: 'General',
      appearance: 'Appearance',
      accountSettings: 'Account Settings',
      email: 'Email',
      
      // Common
      back: 'Back',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
    },
    hi: {
      // Navigation & Menu
      profile: 'प्रोफाइल',
      settings: 'सेटिंग्स',
      logout: 'लॉगआउट',
      language: 'भाषा',
      theme: 'थीम',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      hindi: 'हिंदी',
      english: 'English',
      selectLanguage: 'भाषा चुनें',
      selectTheme: 'थीम चुनें',
      
      // Navigation & Sidebar
      dashboard: 'डैशबोर्ड',
      newCase: 'नया केस',
      doctors: 'डॉक्टर',
      home: 'होम',
      
      // Dashboard
      welcome: 'स्वागत है',
      
      // User Dashboard
      myPets: 'मेरे पालतू जानवर',
      pendingCases: 'लंबित केस',
      consultations: 'परामर्श',
      nearbyDoctors: 'पास के डॉक्टर',
      myCases: 'मेरे केस',
      myProfile: 'मेरी प्रोफाइल',
      findDoctors: 'पास के डॉक्टर खोजें',
      submitCase: 'नया केस जमा करें',
      uploadReport: 'रिपोर्ट अपलोड करें',
      quickActions: 'त्वरित कार्य',
      viewAllCases: 'सभी केस देखें',
      findNearbyDoctors: 'पास के डॉक्टर खोजें',
            // Table & Case Details
      caseId: 'केस ID',
      pet: 'पालतू जानवर',
      doctor: 'डॉक्टर',
      status: 'स्थिति',
      lastUpdate: 'अंतिम अपडेट',
      proTip: '💡 प्रो टिप',
      uploadPetHealthRecordsHelp: 'पालतू जानवर के स्वास्थ्य रिकॉर्ड अपलोड करें ताकि डॉक्टर बेहतर परामर्श दे सकें',
      // Profile Page
      manageYourFarmInfo: 'अपने खेत और व्यक्तिगत जानकारी प्रबंधित करें',
      editProfile: 'प्रोफाइल संपादित करें',
      save: 'सहेजें',
      cancel: 'रद्द करें',
      contactInformation: 'संपर्क जानकारी',
      phone: 'फोन',
      farmInformation: 'खेत की जानकारी',
      farmName: 'खेत का नाम',
      location: 'स्थान',
      farmSize: 'खेत का आकार',
      animalCount: 'पशुओं की संख्या',
      primaryAnimals: 'प्राथमिक जानवर',
      experience: 'अनुभव',
      registrationDate: 'पंजीकरण की तारीख',
      fullName: 'पूरा नाम',
      
      // MyCases Page
      trackAllAnimalCases: 'अपने सभी पशु स्वास्थ्य केसों और उपचारों को ट्रैक करें',
      searchByPetNameOrDisease: 'पालतू जानवर के नाम, केस ID या बीमारी से खोजें...',
      allCases: 'सभी केस',
      activeCases: 'सक्रिय केस',
      pendingCasesText: 'लंबित केस',
      resolvedCases: 'हल किए गए केस',
      disease: 'बीमारी',
      created: 'बनाया गया',
      action: 'कार्रवाई',
      view: 'देखें',
      noCasesFound: 'आपके फ़िल्टर से मेल खाने वाले कोई केस नहीं मिले',
      totalCases: 'कुल केस',
      activeCasesCount: 'सक्रिय केस',
      resolvedCasesCount: 'हल किए गए केस',
      
      // SubmitCase Page
      submitNewAnimalCase: 'नया पशु स्वास्थ्य केस जमा करें',
      provideDetailsAndUploadPhotos: 'पशु चिकित्सा परामर्श के लिए विवरण प्रदान करें और फोटो अपलोड करें',
      uploadAnimalImage: 'पशु की छवि अपलोड करें',
      animalType: 'पशु प्रकार',
      selectAnimalType: 'पशु प्रकार चुनें',
      breed: 'नस्ल',
      breedPlaceholder: 'जैसे, होल्स्टीन, गिर',
      ageYears: 'आयु (वर्ष)',
      weightKg: 'वजन (किग्रा)',
      symptoms: 'लक्षण',
      symptomsPlaceholder: 'वर्णन करें कि आप क्या लक्षण देख रहे हैं...',
      duration: 'अवधि',
      durationPlaceholder: 'जैसे, 3 दिन, 1 सप्ताह',
      additionalNotes: 'अतिरिक्त नोट्स',
      notesPlaceholder: 'कोई अन्य प्रासंगिक जानकारी...',
      submitCaseForReview: 'समीक्षा के लिए केस जमा करें',
      submitting: 'जमा हो रहा है...',
      tipsForBetterResults: 'बेहतर नतीजों के लिए सुझाव',
      uploadClearWellLit: 'स्पष्ट, अच्छी तरह से प्रकाशित फोटो अपलोड करें',
      includeMultipleAngles: 'यदि संभव हो तो कई कोणों को शामिल करें',
      beDetailedAboutSymptoms: 'लक्षणों के बारे में विस्तार से बताएं',
      mentionDurationOfIllness: 'बीमारी की अवधि का उल्लेख करें',
      whatHappensNext: 'आगे क्या होगा',
      aiAnalysisOfImages: 'आपकी छवियों का AI विश्लेषण',
      doctorReviewWithin: 'डॉक्टर की समीक्षा (2 घंटे के भीतर)',
      consultationRecommendation: 'परामर्श सिफारिश',
      treatmentPlanProvided: 'उपचार योजना प्रदान की गई',
      caseSubmittedSuccessfully: 'केस सफलतापूर्वक जमा हो गया!',
      vetWillReviewSoon: 'एक पशु चिकित्सक आपके केस की समीक्षा करेगा और जल्द ही आपसे संपर्क करेगा।',
      clickToUploadOrDrag: 'अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें',
      jpgPngUpTo10MB: 'JPG, PNG 10MB तक',
      clickToChangeImage: 'छवि बदलने के लिए क्लिक करें',
            // Nearby Doctors
      findVeterinarians: 'पास के डॉक्टर खोजें',
      connectWithDoctors: 'अपने पास अनुभवी पशु चिकित्सकों से जुड़ें',
      doctorsLocationMap: 'डॉक्टरों का स्थान मानचित्र',
      clickMarkersForDetails: 'विवरण देखने के लिए मार्करों पर क्लिक करें',
      searchByDoctorName: 'डॉक्टर के नाम, विशेषता या स्थान से खोजें...',
      allSpecialties: 'सभी विशेषताएं',
      noDoctorsFound: 'आपकी मानदंडों से मेल खाने वाले कोई डॉक्टर नहीं मिले',
      emergencyVeterinarycare: 'आपातकालीन पशु चिकित्सा देखभाल की आवश्यकता है?',
      
      // Doctor Details
      experience: 'अनुभव',
      availability: 'उपलब्धता',
      ratingAndReviews: 'रेटिंग और समीक्षाएं',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      viewProfile: 'प्रोफाइल देखें',
      
      // Settings
      preferences: 'प्राथमिकताएं',
      general: 'सामान्य',
      appearance: 'उपस्थिति',
      accountSettings: 'खाता सेटिंग्स',
      email: 'ईमेल',
      
      // Common
      back: 'वापस',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि',
      success: 'सफल',
    },
  };

  const t = (key) => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

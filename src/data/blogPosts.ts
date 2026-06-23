export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
}

export const blogCategories = [
  "All",
  "Dog Care",
  "Cat Care",
  "General Pet Health",
  "Nutrition",
  "Emergency Tips",
]

export const blogPosts: BlogPost[] = [
  {
    slug: "5-signs-your-dog-needs-a-vet-visit",
    title: "5 Signs Your Dog Needs a Vet Visit",
    excerpt: "Learn to recognize the subtle signs that indicate your dog may need professional veterinary attention. Early detection can save lives.",
    content: "As a pet parent, knowing when your dog needs veterinary attention can be the difference between a minor issue and a major health crisis. Here are five key signs to watch for:\n\n1. Changes in Appetite: If your dog suddenly stops eating or drinking, it could indicate anything from dental pain to a serious illness. A missed meal or two might not be alarming, but if it persists for more than 24 hours, consult your vet.\n\n2. Lethargy and Weakness: Dogs are naturally energetic. If your usually playful pup seems listless, reluctant to move, or sleeps more than usual, it's time for a checkup. Lethargy can signal infections, pain, or metabolic disorders.\n\n3. Vomiting or Diarrhea: Occasional vomiting may not be concerning, but repeated vomiting, blood in vomit or stool, or diarrhea lasting more than 24 hours requires immediate veterinary attention. Dehydration can set in quickly, especially in small dogs and puppies.\n\n4. Difficulty Breathing: If your dog is panting excessively at rest, wheezing, coughing, or has blue-tinged gums, seek emergency care immediately. Respiratory distress is a medical emergency.\n\n5. Sudden Weight Changes: Unexplained weight loss or gain can indicate thyroid issues, diabetes, parasites, or other conditions. Regular weigh-ins at home can help you catch changes early.\n\nRemember, you know your dog best. If something feels off, trust your instincts and call your vet. At Vizag Animal Hospital, we're always here to help.",
    category: "Dog Care",
    author: "Dr. Priya Sharma",
    date: "2025-05-20",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1551717743-49959835b87f?w=800&h=400&fit=crop",
  },
  {
    slug: "vaccination-schedule-for-puppies",
    title: "Complete Vaccination Schedule for Puppies",
    excerpt: "A month-by-month guide to your puppy's vaccination needs. Protect your furry friend from day one.",
    content: "Vaccinations are one of the most important things you can do to protect your puppy's health. Here's a comprehensive vaccination schedule recommended by our veterinarians at Vizag Animal Hospital:\n\n6-8 Weeks (First Visit):\n- DHPP (Distemper, Hepatitis, Parainfluenza, Parvovirus) — First dose\n- Corona virus vaccine (if recommended)\n\n10-12 Weeks:\n- DHPP — Second dose\n- Leptospirosis vaccine\n- Bordetella (kennel cough) if boarding or socializing\n\n14-16 Weeks:\n- DHPP — Final dose\n- Rabies vaccine — First dose (mandatory by Indian law)\n\n16+ Weeks:\n- Anti-rabies booster (as per manufacturer)\n- Lyme disease vaccine (if in tick-prone area)\n\nAnnual Boosters:\n- DHPP booster\n- Rabies booster (yearly or triennially depending on vaccine type)\n- Bordetella booster (every 6-12 months if needed)\n\nTips for Puppy Parents:\n- Keep your puppy away from unvaccinated dogs and public areas until the vaccination series is complete.\n- Maintain a vaccination record card — we provide one at every visit.\n- Some puppies may have mild reactions (lethargy, slight fever) — this is normal for 24 hours.\n- Contact us immediately if you notice severe reactions like facial swelling or difficulty breathing.\n\nCost Considerations:\nA complete puppy vaccination series at Vizag Animal Hospital typically costs between ₹2,000–₹3,500, including all core vaccines and consultations. We offer a puppy package discount.\n\nRemember: Vaccinations save lives. Don't skip or delay them!",
    category: "Dog Care",
    author: "Dr. Ramesh Rao",
    date: "2025-05-15",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=400&fit=crop",
  },
  {
    slug: "cat-grooming-101",
    title: "Cat Grooming 101: Keeping Your Feline Friend Fabulous",
    excerpt: "Essential grooming tips for cat owners. From brushing to nail trimming, here's everything you need to know.",
    content: "While cats are excellent self-groomers, they still need our help to stay in top condition. Here's a complete guide to cat grooming:\n\nBrushing:\n- Short-haired cats: Brush once a week to remove loose hair and reduce hairballs.\n- Long-haired cats (Persians, Maine Coons): Brush daily to prevent matting.\n- Use a stainless steel comb and a soft bristle brush.\n- Start grooming sessions short (5 minutes) and gradually increase.\n\nBathing:\n- Most cats don't need frequent baths — once every 4-6 weeks is sufficient.\n- Use cat-specific shampoo (human products can be toxic).\n- Brush before bathing to remove tangles.\n- Keep water lukewarm and use minimal water to reduce stress.\n\nNail Trimming:\n- Trim every 2-3 weeks using cat-specific clippers.\n- Only trim the clear tip — avoid the pink quick.\n- If your cat resists, trim a few nails at a time.\n- Provide a scratching post to naturally maintain nail health.\n\nEar Cleaning:\n- Check ears weekly for wax, debris, or odor.\n- Clean with a vet-approved ear cleaner and cotton ball.\n- Never use cotton swabs inside the ear canal.\n\nDental Care:\n- Brush teeth 2-3 times per week with cat-specific toothpaste.\n- Never use human toothpaste — it's toxic to cats.\n- Dental treats and toys help reduce tartar.\n\nProfessional Grooming:\nAt Vizag Animal Hospital, we offer professional cat grooming including:\n- Full body brushing and de-shedding\n- Medicated baths for skin conditions\n- Nail trimming and filing\n- Ear cleaning\n- Sanitary trim\n\nPrices start at ₹500. Book an appointment today!",
    category: "Cat Care",
    author: "Lakshmi Devi",
    date: "2025-05-08",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518791841217-8f162571bbb4?w=800&h=400&fit=crop",
  },
  {
    slug: "understanding-pet-nutrition",
    title: "Understanding Pet Nutrition: A Complete Guide",
    excerpt: "What should you feed your pet? Learn about balanced nutrition, reading food labels, and choosing the right diet.",
    content: "Proper nutrition is the foundation of your pet's health. With so many options available, choosing the right food can be overwhelming. Here's what you need to know:\n\nUnderstanding Pet Food Labels:\n- Look for AAFCO certification (or equivalent) confirming the food is complete and balanced.\n- The first ingredient should be a named animal protein (chicken, lamb, fish).\n- Avoid foods with excessive fillers (corn, wheat, soy as primary ingredients).\n- Check for artificial colors, flavors, and preservatives — these should be minimal.\n\nLife Stage Nutrition:\nPuppy/Kitten (0-12 months): Higher protein, fat, and calorie content for growth.\nAdult (1-7 years): Balanced maintenance formula with moderate protein and fat.\nSenior (7+ years): Lower calorie, higher fiber, joint support supplements.\n\nDry vs. Wet Food:\n- Dry food (kibble): Convenient, helps with dental health, more economical.\n- Wet food: Higher moisture content (good for urinary health), more palatable.\n- A mix of both often works best.\n\nIndian Market Brands We Recommend:\nPremium: Royal Canin, Hills Science Diet, Orijen, Acana\nMid-range: Pedigree, Whiskas, Drools, Pure Pet\nBudget: Meat Up, Kennel Kitchen (limited range)\n\nHomemade Food:\nWhile homemade food can be healthy, it requires careful planning:\n- Consult your vet before switching to a homemade diet.\n- Include protein (40-50%), carbohydrates (30-40%), and vegetables (10-20%).\n- Never feed onions, garlic, chocolate, grapes, or raisins — these are toxic.\n- Add a calcium and vitamin supplement.\n\nPortion Control:\nOverfeeding is the leading cause of pet obesity in India. Follow the feeding guidelines on the pack, but adjust based on your pet's activity level, age, and body condition. A simple test: you should be able to feel your pet's ribs without pressing hard, but they shouldn't be visible.\n\nWater:\nAlways provide fresh, clean water. Pets need approximately 60ml of water per kg body weight daily. More in hot weather.\n\nAt Vizag Animal Hospital, we offer free nutrition consultations. Book an appointment to get a personalized diet plan for your pet.",
    category: "Nutrition",
    author: "Dr. Priya Sharma",
    date: "2025-04-28",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc860?w=800&h=400&fit=crop",
  },
  {
    slug: "emergency-first-aid-for-pets",
    title: "Emergency First Aid for Pets: What Every Owner Should Know",
    excerpt: "Accidents happen. Learn basic pet first aid that could save your furry friend's life before you reach the vet.",
    content: "In an emergency, knowing basic first aid can stabilize your pet before you reach the clinic. Here's what every pet owner should know:\n\nBleeding:\n- Apply firm pressure with a clean cloth or gauze.\n- Elevate the wound if possible.\n- For severe bleeding, apply a tourniquet above the wound (loosen every 15 minutes).\n- Transport to vet immediately.\n\nChoking:\n- If your pet is conscious, check inside the mouth for foreign objects.\n- For small dogs/cats: hold upside down by the hind legs and give gentle chest thrusts.\n- For large dogs: perform the Heimlich maneuver — place fists behind the last rib and push upward.\n- Rush to the vet even if the object is removed.\n\nPoisoning:\n- Identify the substance if possible.\n- Do NOT induce vomiting without consulting a vet — some substances cause more damage coming back up.\n- Call our emergency line immediately: +91 98765 43210.\n- Bring the packaging or substance with you to the clinic.\n\nHeatstroke:\n- Move to a cool, shaded area immediately.\n- Wet the body with cool (not cold) water.\n- Place wet towels on the head, neck, and chest.\n- Offer small amounts of water.\n- Transport to vet — heatstroke can cause organ failure.\n\nSeizures:\n- Keep calm and note the time and duration.\n- Clear the area of objects that could cause injury.\n- Do NOT put your hands near the mouth — pets cannot swallow their tongue.\n- Keep the environment quiet and dim.\n- Call the vet once the seizure stops.\n\nBurns:\n- Flush the area with cool water for 10-15 minutes.\n- Apply a clean, dry dressing.\n- Do not apply butter, oil, or any home remedies.\n- Transport to vet.\n\nFractures:\n- Immobilize the suspected fracture with a makeshift splint (rolled newspaper, magazine).\n- Do not try to realign the bone.\n- Keep your pet as still as possible during transport.\n- Place small pets in a carrier with padding.\n\nTransporting an Injured Pet:\n- Use a flat board or sturdy blanket as a stretcher for large dogs.\n- Small pets should be placed in a carrier with soft padding.\n- Keep the head elevated and stable.\n- Drive carefully — sudden movements can worsen injuries.\n\nCreate a Pet First Aid Kit:\n- Gauze pads and rolls\n- Adhesive tape\n- Cotton balls\n- Hydrogen peroxide (3%)\n- Digital thermometer\n- Tweezers\n- Scissors (blunt-nose)\n- Disposable gloves\n- Saline solution\n- Cold pack\n- Your vet's emergency number\n\nRemember: First aid is NOT a substitute for veterinary care. Always seek professional help after providing first aid. Our 24/7 emergency line is +91 98765 43210.",
    category: "Emergency Tips",
    author: "Dr. Krishna Reddy",
    date: "2025-04-20",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=800&h=400&fit=crop",
  },
  {
    slug: "monsoon-care-tips-for-pets",
    title: "Monsoon Care Tips for Pets in India",
    excerpt: "Rainy season brings unique challenges for pet owners. Here's how to keep your pets healthy and happy during the monsoon.",
    content: "The Indian monsoon brings relief from the heat but also creates health challenges for pets. Here's a comprehensive guide to monsoon pet care:\n\nSkin & Coat Care:\n- Dry your pet thoroughly after walks in the rain. Dampness leads to fungal infections.\n- Increase brushing frequency to prevent matting.\n- Watch for signs of fungal infections: redness, itching, hair loss, bad odor.\n- Use anti-fungal shampoo once a week during peak monsoon.\n- Keep bedding dry — change daily if needed.\n\nTick & Flea Prevention:\n- Ticks thrive in humid conditions — check your pet daily after walks.\n- Use tick prevention collars or spot-on treatments.\n- Keep grass trimmed in your yard.\n- Wash pet bedding in hot water weekly.\n- Consider professional de-ticking treatment.\n\nDiet & Nutrition:\n- Add immune-boosting supplements (vitamin C, omega-3).\n- Ensure food is fresh — humidity accelerates spoilage.\n- Keep dry food in airtight containers with silica gel packets.\n- Avoid giving cold or refrigerated food.\n- Ensure clean, filtered drinking water at all times.\n\nExercise:\n- Create indoor play activities when it's too wet outside.\n- Use puzzle toys and treat-dispensing balls for mental stimulation.\n- Short, frequent walks when the rain stops are better than one long walk.\n- Dry paws after every walk — wet paws can cause infections.\n\nRespiratory Health:\n- Keep your pet away from damp, moldy areas.\n- Ensure good ventilation in the house.\n- Watch for coughing, sneezing, or nasal discharge.\n- Kennel cough is more common during monsoon — keep vaccinations updated.\n\nPaw Care:\n- Clean paws after every walk.\n- Check for cracks, redness, or wounds.\n- Apply paw balm if pads become dry.\n- Avoid walking on wet, muddy ground where possible.\n- Keep fur between paw pads trimmed.\n\nCommon Monsoon Ailments:\n1. Fungal skin infections (Ringworm, Malassezia)\n2. Tick-borne diseases (Tick Fever, Babesiosis)\n3. Respiratory infections (Kennel cough)\n4. Ear infections (especially in floppy-eared breeds)\n5. Gastrointestinal infections (from contaminated water)\n\nIf you notice any symptoms, don't wait — book an appointment at Vizag Animal Hospital. Early treatment prevents complications.\n\nMonsoon Grooming Package:\nWe offer a special monsoon grooming package that includes anti-fungal bath, tick check, ear cleaning, and paw care — all for just ₹600 (regular price ₹800). Book now!",
    category: "General Pet Health",
    author: "Dr. Anjali Verma",
    date: "2025-04-10",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&h=400&fit=crop",
  },
  {
    slug: "spaying-and-neutering-benefits",
    title: "Spaying and Neutering: Benefits, Myths, and Recovery",
    excerpt: "Everything you need to know about spaying/neutering your pet, including health benefits and post-surgery care.",
    content: "Spaying (for females) and neutering (for males) are among the most common surgical procedures we perform at Vizag Animal Hospital. Let's clear up the facts and myths:\n\nHealth Benefits:\n- Reduces risk of certain cancers (mammary, testicular, ovarian, uterine)\n- Prevents pyometra (life-threatening uterine infection)\n- Reduces roaming behavior in males (less likely to get into fights or accidents)\n- Decreases urine marking and territorial aggression\n- Increases lifespan by 1-3 years on average\n\nCommon Myths Debunked:\nMyth: \"My pet will get fat.\"\nFact: Spaying/neutering may slightly reduce metabolism, but weight gain is caused by overfeeding and lack of exercise, not the surgery itself.\n\nMyth: \"My pet needs to have one litter first.\"\nFact: There is no medical benefit to letting a pet have a litter. In fact, spaying before the first heat cycle dramatically reduces mammary cancer risk.\n\nMyth: \"It's too expensive.\"\nFact: At Vizag Animal Hospital, spay/neuter starts at ₹2,500. Compare this to the cost of treating pyometra (₹10,000+) or cancer (₹20,000+).\n\nWhen to Spay/Neuter:\n- Dogs: 6-8 months (small breeds), 8-12 months (large breeds)\n- Cats: 4-6 months\n- Rabbits: 4-6 months\n- Consult your vet — timing varies by breed and health status.\n\nThe Procedure:\n- Pre-surgical blood work is done to ensure your pet is healthy enough for anesthesia.\n- The surgery is performed under general anesthesia.\n- For females: removal of ovaries and uterus (ovariohysterectomy).\n- For males: removal of testicles (castration).\n- Surgery duration: 30-60 minutes.\n- Your pet goes home the same day.\n\nPost-Surgery Care:\n- Keep your pet indoors and calm for 7-10 days.\n- Use an Elizabethan collar (cone) to prevent licking the incision.\n- Check the incision daily for redness, swelling, or discharge.\n- Give prescribed pain medication on schedule.\n- Don't bathe your pet until stitches are removed (10-14 days).\n- Limit activity — no jumping, running, or stairs.\n- Offer small amounts of food and water after surgery.\n- Return for a follow-up checkup at 7 days.\n\nWarning Signs After Surgery:\nContact us immediately if you notice:\n- Excessive swelling or redness at the incision\n- Discharge or foul odor from the incision\n- Lethargy lasting more than 24 hours\n- Refusal to eat or drink\n- Vomiting or diarrhea\n- Incision opening or bleeding\n\nCost at Vizag Animal Hospital:\n- Female dog spay: ₹3,500 – ₹6,000 (depending on size)\n- Male dog neuter: ₹2,500 – ₹4,000\n- Cat spay: ₹3,000 – ₹4,000\n- Cat neuter: ₹2,000 – ₹2,500\n\nAll prices include pre-surgical consultation, anesthesia, surgery, and post-op medication.\n\nBook your appointment today — your pet will thank you!",
    category: "General Pet Health",
    author: "Dr. Ramesh Rao",
    date: "2025-03-25",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop",
  },
  {
    slug: "dental-health-month-guide",
    title: "Pet Dental Health: A Month-by-Month Guide",
    excerpt: "February is Pet Dental Health Month! Here's how to maintain your pet's oral hygiene year-round.",
    content: "Did you know that by age 3, 80% of dogs and 70% of cats show signs of dental disease? Good oral hygiene is essential for your pet's overall health. Here's our month-by-month guide:\n\nJanuary: Start the Year Right\n- Schedule a dental checkup with your vet.\n- Start a daily brushing routine if you haven't already.\n- Invest in pet-specific toothpaste and a soft-bristled brush.\n\nFebruary: Dental Health Month\n- Take advantage of our discounted dental scaling packages.\n- Learn proper brushing technique from our team.\n- Get a professional assessment of your pet's oral health.\n\nMarch: Spring Clean\n- Replace old, worn chew toys.\n- Start using dental treats approved by VOHC (Veterinary Oral Health Council).\n- Check your pet's gums — they should be pink, not red or white.\n\nApril-May: Summer Care\n- Dental health can be affected by dehydration — ensure adequate water intake.\n- Dry food can help scrape plaque — consider adding kibble if your pet eats only wet food.\n\nJune-August: Monsoon Season\n- Monitor for bad breath (halitosis) — humidity can worsen oral bacteria.\n- Keep up with brushing even during gloomy weather.\n\nSeptember-October: Festive Season\n- Avoid feeding sweets to pets — sugar causes dental decay.\n- Diwali treats for pets should be dental-friendly.\n\nNovember-December: Year-End Checkup\n- Schedule your second dental checkup of the year.\n- Review and adjust your pet's dental care routine.\n- Plan for any needed dental procedures before the year ends.\n\nSigns of Dental Problems:\n- Bad breath (beyond normal 'dog breath')\n- Yellow or brown tartar on teeth\n- Red, swollen, or bleeding gums\n- Drooling excessively\n- Pawing at the mouth\n- Reluctance to eat hard food\n- Loose or missing teeth\n- Dropping food while eating\n\nBrushing Tips:\n- Start slow — let your pet taste the toothpaste first.\n- Use a finger brush initially, then switch to a regular brush.\n- Brush in circular motions at a 45-degree angle to the gum line.\n- Focus on the outside surfaces — the tongue cleans the inside.\n- Even brushing 3 times a week makes a significant difference.\n- Never use human toothpaste — fluoride is toxic to pets.\n\nDental Products We Recommend:\n- Virbac enzymatic toothpaste (chicken, beef, or malt flavor)\n- CET dual-ended toothbrush\n- Greenies dental treats\n- Pedigree Dentastix\n- Rope toys for natural flossing\n\nProfessional Dental Cleaning at Vizag Animal Hospital:\nOur professional dental cleaning includes:\n- Pre-anesthetic blood work\n- General anesthesia\n- Ultrasonic scaling and polishing\n- Tooth extraction (if needed)\n- Fluoride treatment\n- Post-operative care kit\n\nStarting at ₹1,500. Book during Dental Health Month (February) for 20% off!",
    category: "General Pet Health",
    author: "Dr. Priya Sharma",
    date: "2025-03-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=400&fit=crop",
  },
]
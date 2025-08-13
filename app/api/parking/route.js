export async function GET() {
    const parkingData = [
      { id: 1, name: "Central Mall Parking", location: "Downtown", type: "Covered", pricePerHour: 50, availability: "Available", paid: false },
      { id: 2, name: "City Center Parking", location: "Uptown", type: "Open", pricePerHour: 30, availability: "Full", paid: false },
      { id: 3, name: "Airport Parking", location: "Airport", type: "Covered", pricePerHour: 80, availability: "Available", paid: true },
      { id: 4, name: "Station Parking", location: "Downtown", type: "Open", pricePerHour: 20, availability: "Available", paid: false },
      { id: 5, name: "Beachside Parking", location: "Seaside", type: "Covered", pricePerHour: 40, availability: "Full", paid: true },
  
      // Added more data for testing
      { id: 6, name: "Metro Station Parking", location: "Uptown", type: "Covered", pricePerHour: 25, availability: "Available", paid: false },
      { id: 7, name: "Grand Plaza Parking", location: "Downtown", type: "Open", pricePerHour: 35, availability: "Full", paid: true },
      { id: 8, name: "Old Town Parking", location: "Old City", type: "Covered", pricePerHour: 45, availability: "Available", paid: false },
      { id: 9, name: "Harbor Parking", location: "Seaside", type: "Open", pricePerHour: 15, availability: "Available", paid: true },
      { id: 10, name: "Hill View Parking", location: "Hilltop", type: "Covered", pricePerHour: 55, availability: "Full", paid: false },
  
      { id: 11, name: "North Market Parking", location: "Northside", type: "Open", pricePerHour: 28, availability: "Available", paid: true },
      { id: 12, name: "South Market Parking", location: "Southside", type: "Covered", pricePerHour: 38, availability: "Available", paid: false },
      { id: 13, name: "Tech Park Parking", location: "Tech District", type: "Covered", pricePerHour: 60, availability: "Available", paid: true },
      { id: 14, name: "University Parking", location: "Campus", type: "Open", pricePerHour: 18, availability: "Full", paid: false },
      { id: 15, name: "Hospital Parking", location: "Downtown", type: "Covered", pricePerHour: 50, availability: "Available", paid: true },
  
      { id: 16, name: "Event Center Parking", location: "Midtown", type: "Open", pricePerHour: 25, availability: "Available", paid: false },
      { id: 17, name: "Luxury Mall Parking", location: "Uptown", type: "Covered", pricePerHour: 70, availability: "Full", paid: true },
      { id: 18, name: "River Side Parking", location: "Seaside", type: "Open", pricePerHour: 22, availability: "Available", paid: false },
      { id: 19, name: "Mountain Base Parking", location: "Hilltop", type: "Covered", pricePerHour: 65, availability: "Available", paid: true },
      { id: 20, name: "Industrial Parking", location: "Industrial Area", type: "Open", pricePerHour: 20, availability: "Full", paid: false },
  
      // More variations for testing large list
      { id: 21, name: "West End Parking", location: "Westside", type: "Open", pricePerHour: 32, availability: "Available", paid: true },
      { id: 22, name: "East End Parking", location: "Eastside", type: "Covered", pricePerHour: 48, availability: "Full", paid: false },
      { id: 23, name: "Sports Complex Parking", location: "Midtown", type: "Covered", pricePerHour: 52, availability: "Available", paid: true },
      { id: 24, name: "Downtown Plaza Parking", location: "Downtown", type: "Covered", pricePerHour: 55, availability: "Available", paid: false },
      { id: 25, name: "Seaport Parking", location: "Seaside", type: "Open", pricePerHour: 18, availability: "Full", paid: true },
  
      { id: 26, name: "City Hall Parking", location: "Old City", type: "Covered", pricePerHour: 50, availability: "Available", paid: false },
      { id: 27, name: "Art Gallery Parking", location: "Uptown", type: "Open", pricePerHour: 27, availability: "Available", paid: true },
      { id: 28, name: "Science Museum Parking", location: "Downtown", type: "Covered", pricePerHour: 58, availability: "Full", paid: false },
      { id: 29, name: "Opera House Parking", location: "Old City", type: "Covered", pricePerHour: 54, availability: "Available", paid: true },
      { id: 30, name: "Aquarium Parking", location: "Seaside", type: "Open", pricePerHour: 24, availability: "Available", paid: false }
    ];
  
    return Response.json(parkingData);
  }
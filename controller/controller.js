import School from "../models/shcool.js"

 export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const school = await School.create({ name, address, latitude, longitude });
    res.status(201).json({ message: 'School added successfully', id: school.id });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const listSchools = async (req, res) => {
  const { latitude: userLat, longitude: userLng } = req.query;

  if (!userLat || !userLng) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    const schools = await School.findAll();

    const withDistance = schools.map((school) => {
      const distance = Math.sqrt(
        Math.pow(school.latitude - userLat, 2) + Math.pow(school.longitude - userLng, 2)
      );
      return { ...school.toJSON(), distance };
    });

    const sorted = withDistance.sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching schools' });
  }
};

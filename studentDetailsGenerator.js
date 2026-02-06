const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateStudents = (count) => {
  const students = [];
  const classes = ['7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'];
  const religions = ['Christian', 'Muslim', 'Buddhist', 'Hindu', 'Atheist'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const gender = faker.helpers.arrayElement(['Male', 'Female']);

    students.push({
      id: `F-${faker.number.int({ min: 1000, max: 9999 })}`,
      photo_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`,
      name: `${firstName} ${lastName}`,
      enroll_year: faker.number.int({ min: 2015, max: 2025 }).toString(),
      gender: gender,
      dob: faker.date.birthdate({ min: 12, max: 18, mode: 'age' }).toISOString().split('T')[0],
      class: faker.helpers.arrayElement(classes),
      religion: faker.helpers.arrayElement(religions),
      blood_group: faker.helpers.arrayElement(bloodGroups),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state({ abbreviation: true })} ${faker.location.zipCode()}`,
      parents: {
        father: {
          name: faker.person.fullName({ sex: 'male' }),
          phone: faker.phone.number()
        },
        mother: {
          name: faker.person.fullName({ sex: 'female' }),
          phone: faker.phone.number()
        }
      }
    });
  }

  return students;
};

const data = generateStudents(500);

// Write to file
fs.writeFile('students.json', JSON.stringify(data, null, 2), (err) => {
  if (err) throw err;
  console.log('Successfully generated 500 students in students.json!');
});
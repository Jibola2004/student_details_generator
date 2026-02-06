const { fakerEN_NG: faker } = require('@faker-js/faker');
const fs = require('fs');

const generateStaffData = (count) => {
  const staff = [];

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const dept = faker.helpers.arrayElement(['Sciences', 'Arts', 'Commercial', 'Admin', 'Vocational']);

    staff.push({
      staff_id: `S-${faker.number.int({ min: 1000, max: 9999 })}`,
      personal_info: {
        first_name: firstName,
        last_name: lastName,
        dob: faker.date.birthdate({ min: 22, max: 60, mode: 'age' }).toISOString().split('T')[0],
        gender: faker.person.sex(),
        blood_group: faker.helpers.arrayElement(['A+', 'B+', 'O+', 'O-', 'AB+']),
        religion: faker.helpers.arrayElement(['Christianity', 'Islam'])
      },
      contact: {
        phone: faker.phone.number(),
        email: faker.internet.email({ firstName, lastName, provider: 'school.edu.ng' }).toLowerCase(),
        address: {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state()
        }
      },
      employment: {
        job_title: dept === 'Admin' ? faker.person.jobTitle() : `${faker.helpers.arrayElement(['Math', 'Physics', 'History', 'Biology'])} Teacher`,
        department: dept,
        hire_date: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        contract_type: faker.helpers.arrayElement(['permanent', 'probation', 'part-time']),
        salary_amount: parseFloat(faker.finance.amount(150000, 500000, 0)),
        currency: "NGN",
        status: faker.helpers.arrayElement(['active', 'active', 'active', 'on-leave', 'inactive']) // Weighted toward active
      },
      emergency_contact: {
        full_name: `${faker.person.firstName()} ${lastName}`,
        phone: faker.phone.number(),
        relationship: faker.helpers.arrayElement(['Spouse', 'Sibling', 'Parent'])
      }
    });
  }

  return staff;
};

const data = generateStaffData(100);

fs.writeFileSync('staff_list.json', JSON.stringify(data, null, 2));
console.log('✅ Generated 100 realistic staff records in staff_list.json');
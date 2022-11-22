const constructionCompaniesNames = require('../data/companies.json');
const constructionCompaniesLogos = require('../data/logos.json');
const constructionCompaniesSpecialities = require('../data/specialities.json');
const cities = require('../data/cities.json');

// This is just to create a dummy data of construction companies
const createConstructionsRepository = () => {
    return constructionCompaniesNames.map((name, index) => {

        const specialities = [];
        const specialitiesToAdd = Math.floor(Math.random() * constructionCompaniesSpecialities.length) + 1;
        const remainingSpecialities = constructionCompaniesSpecialities.slice();

        for (let i = 0; i < specialitiesToAdd; i++) {
            const randomIndex = Math.floor(Math.random() * remainingSpecialities.length);
            specialities.push(remainingSpecialities[randomIndex]);
            remainingSpecialities.splice(randomIndex, 1);
        }

        const city = cities[Math.floor(Math.random() * cities.length)];

        return {
            id: index * 2 ,
            name,
            logo: constructionCompaniesLogos[index],
            speciality: specialities.sort(),
            city,
        };
    });
}

module.exports = { createConstructionsRepository }
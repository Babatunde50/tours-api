const fs = require('fs');
const path = require('path');

const fileLoc = path.join(__dirname, '..', 'dev-data', 'data', 'tours-simple.json');
const tours = JSON.parse(fs.readFileSync(fileLoc));

exports.checkId = (req, res, next, value) => {
  if (+value > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    });
  }
  next()
}

exports.checkBody = (req, res, next) => {
  const allProperties = Object.keys(req.body)
  console.log(allProperties)
  if(!(allProperties.includes('name') && allProperties.includes('price'))) {
    return res.status(400).json({
      status: 'fail',
      message: "Invalid credentials"
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt: req.requestTime,
    data: {
      tours
    }
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = {
    ...req.body,
    id: newId
  };
  tours.push(newTour);
  fs.writeFile(fileLoc, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
};

exports.getTour = (req, res) => {
  const tour = tours.find(tour => tour.id === +req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here'
    }
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
var express = require('express');
var router = express.Router();
const bluebird = require('bluebird');

const providersModel = require('./../../models/providers');
// const channelCollectionsModel = require('lib/models/channel_collections');

// const channelTagsModel = require('lib/models/channel_tags');
// 193

/* GET providers listing. */
router.get('/', function(req, res, next) {
  const params = [];
  if (req.query.providerName) params.push({key: 'p.provider', value: req.query.providerName, match: 'ilike'});
  if (req.query.city) params.push({key: 'a.city', value: req.query.city, match: 'ilike'});
  if (req.query.zipCode) params.push({key: 'a.zip_code', value: req.query.zipCode, match: 'like'});
  if (req.query.county) params.push({key: 'a.county', value: req.query.county, match: 'ilike'});
  if (req.query.providerId) params.push({key: 'p.id', value: req.query.providerId, match: '='});

  return providersModel.getProvidersByQuery(params).then(items => {
    console.dir (items.length);
    res.status(200).json(
      {
        "items": [
          items
        ]
      }
    );
  });
});

module.exports = router;

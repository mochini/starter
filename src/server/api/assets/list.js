import AssetSerializer from '../../serializers/asset_serializer'
import Asset from '../../models/asset'

const route = async (req, res) => {

  const assets = await Asset.filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(assets, AssetSerializer)

}

export default route

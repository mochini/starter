const asset_serializer = (asset) => ({
  id: asset.get('id'),
  identifier: asset.get('identifier'),
  original_file_name: asset.get('original_file_name'),
  file_name: asset.get('file_name'),
  content_type: asset.get('content_type'),
  file_size: asset.get('file_size'),
  chunks_total: asset.get('chunks_total'),
  path: asset.get('path'),
  status: asset.get('status'),
  created_at: asset.get('created_at'),
  updated_at: asset.get('updated_at')
})

export default asset_serializer

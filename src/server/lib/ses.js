import aws from './aws'

const SES = new aws.SES({ apiVersion: '2010-12-01' })

export default SES

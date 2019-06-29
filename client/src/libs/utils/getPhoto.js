import axios from 'axios'
import defaultPhoto from 'img/defaultPhoto.png'

const vkServiceKey = "c04de2f0c04de2f0c04de2f07fc0274a03cc04dc04de2f09cac39268ba71a3c9507cdee"

export default async props => {
  if (props.vk)
    return (await axios
      .get(`https://api.vk.com/method/users.get?user_id=${props.vk}&v=5.52&fields=photo_200,photo_400_orig&access_token=${vkServiceKey}`)
      ).data
  if (props.inst)
    return (await axios
      .get(`https://api.vk.com/method/users.get?user_id=${props.vk}&v=5.52&fields=photo_200,photo_400_orig&access_token=${vkServiceKey}`)
      ).data
  return defaultPhoto
}
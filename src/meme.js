/// <reference types="@zyllio/zy-sdk" />


(function () {

  console.log('Plugin Meme started')

  class GetRandomMemeAction {

    async execute(properties) {

      console.log('execute: GetRandomMemeAction')

      const data = await (await fetch('https://api.imgflip.com/get_memes')).json()

      const memes = data.data.memes

      const random = parseInt(Math.random() * 100)

      const meme = memes[random]

      const propertyValue = properties[0].value

      zySdk.services.dictionary.setValue(propertyValue, meme.url)

      return true
    }
  }

  const zyGetRandomMemeAction = new GetRandomMemeAction()

  const IconData = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24" fill="#cccccc">    
    <path d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z" />
  </svg>
`;

  const GetRandomMemeMetadata = {
    id: 'get-random-meme',
    icon: IconData,
    label: 'Get random meme',
    category: 'Memes',
    properties: [{
      id: 'value',
      name: 'Meme URL',
      type: 'text',
      tootip: `The meme image`,
      default: '',
      main: true,
      write: true
    }]
  }

  zySdk.services.registry.registerAction(GetRandomMemeMetadata, zyGetRandomMemeAction)


})();

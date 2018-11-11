export const init = async () => {
  const { gapi } = window
  return new Promise(function(resolve, reject) {
    gapi.load('client:auth2', async () => {
      gapi.client.setApiKey('AIzaSyDkLj8oi-F6H9JH9b-T-PCbSg5HBmQNqXY')
      await gapi.client.init({
        'clientId': '789217222906-lhri0npmadqkrkkrb8s622qutccpi83q.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
      })

      window.GoogleAuth = gapi.auth2.getAuthInstance();
      window.GoogleAuth.isSignedIn.listen(updateSigninStatus);
      setSigninStatus();
    })

    function setSigninStatus() {
      let user = window.GoogleAuth.currentUser.get();
      let isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner')
      // Toggle button text and displayed statement based on current auth status.
      if (isAuthorized) {
        resolve()
      } else {
        window.GoogleAuth.signIn()
      }
    }

    function updateSigninStatus(isSignedIn) {
      setSigninStatus()
    }
  })
}

export const request = async (params) => {
  return await buildApiRequest('GET', '/youtube/v3/search', {
    ...params,
    part: 'snippet',
    type: 'video',
    order: 'date'
  })
}

const buildApiRequest = async(requestMethod, path, params, properties) => {
  return new Promise(function(resolve, reject) {
    let { gapi } = window
    params = removeEmptyParams(params);
    let request, resource
    if (properties) {
      resource = createResource(properties);
      request = gapi.client.request({
          'body': resource,
          'method': requestMethod,
          'path': path,
          'params': params
      });
    } else {
      request = gapi.client.request({
          'method': requestMethod,
          'path': path,
          'params': params
      });
    }

    request.execute(function(response) {
      resolve(response)
    })
  })
}

const createResource = (properties) => {
  let resource = {};
  let normalizedProps = properties;
  for (let p in properties) {
    let value = properties[p];
    if (p && p.substr(-2, 2) === '[]') {
      let adjustedName = p.replace('[]', '');
      if (value) {
        normalizedProps[adjustedName] = value.split(',');
      }
      delete normalizedProps[p];
    }
  }
  for (let p in normalizedProps) {
    // Leave properties that don't have values out of inserted resource.
    if (normalizedProps.hasOwnProperty(p) && normalizedProps[p]) {
      let propArray = p.split('.');
      let ref = resource;
      for (let pa = 0; pa < propArray.length; pa++) {
        let key = propArray[pa];
        if (pa === propArray.length - 1) {
          ref[key] = normalizedProps[p];
        } else {
          ref = ref[key] = ref[key] || {};
        }
      }
    };
  }
  return resource;
}

const removeEmptyParams = (params) => {
  for (let p in params) {
    if (!params[p] || params[p] === 'undefined') {
      delete params[p];
    }
  }
  return params;
}

import React, { useEffect } from 'react';

export default function MapFaq() {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'module';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Error loading script: ${src}`));
        document.body.appendChild(script);
      });
    };

    const initializeMap = async () => {
      await loadScript('https://unpkg.com/@googlemaps/extended-component-library@0.6');

      await customElements.whenDefined('gmpx-store-locator');
      const locator = document.querySelector('gmpx-store-locator');
      locator.configureFromQuickBuilder({
        "locations": [
          {"coords": { "lat": -32.37094843901511, "lng": -58.879643711567155 }},
          {"coords": { "lat": -31.33978113485237, "lng": -59.44625414575129  }},
          {"coords": { "lat": -32.47795662142264, "lng": -58.271235453143944 }},
          {"coords": { "lat": -32.464948289379855, "lng": -58.477497649496144}},
          {"coords": { "lat": -32.22496458700442, "lng": -58.1457077837318   }},
          {"coords": { "lat": -31.375357247084985, "lng": -58.02256802262516 }},
          {"coords": { "lat": -31.046756964350717, "lng": -59.08735775679073 }},
          {"coords": { "lat": -30.98792602124702, "lng": -57.92444988938854  }},
          {"coords": { "lat": -30.949119204787557, "lng": -58.78474004743651 }},
          {"coords": { "lat": -31.523631707993744, "lng": -58.40641087650158 }},
          {"coords": { "lat": -31.51129607197726, "lng": -59.83547432261556  }},
          {"coords": { "lat": -31.17035512328485, "lng": -58.185297927606165 }},
          {"coords": { "lat": -31.663554809374805, "lng": -59.90105015426214 }},
          {"coords": { "lat": -32.39351631332021, "lng": -59.79396872830562  }},
          {"coords": { "lat": -31.98525039741872, "lng": -58.96318056622125  }},
          {"coords": { "lat": -32.15402395926019, "lng": -58.19227377404234  }},
          {"coords": { "lat": -32.305595253995904, "lng": -59.143976406801514}},
          {"coords": { "lat": -30.33910458773428, "lng": -58.30643155406621  }},
          {"coords": { "lat": -32.201535677905305, "lng": -58.21685314925342 }},
          {"coords": { "lat": -31.621089964669636, "lng": -58.50667733511597 }},
          {"coords": { "lat": -31.23838739261894, "lng": -59.218763848202144 }},
          {"coords": { "lat": -31.792538004379143, "lng": -58.315236697564536}},
          {"coords": { "lat": -31.86799403266083, "lng": -60.007379323179016 }},
          {"coords": { "lat": -32.16059651940707, "lng": -58.40603280692794  }},
          {"coords": { "lat": -33.714433981073995, "lng": -58.66000406766557 }},
          {"coords": { "lat": -31.862430358737836, "lng": -59.03268910295663 }},
          {"coords": { "lat": -27.031937371839813, "lng": -54.67339446209858 }},
          {"coords": { "lat": -27.372110330428487, "lng": -54.74898465865847 }},
          {"coords": { "lat": -27.91334788166651, "lng": -55.751653896793535 }},
          {"coords": { "lat": -27.101000805157778, "lng": -54.89174310002708 }},
          {"coords": { "lat": -26.261400590857633, "lng": -53.64977788846988 }},
          {"coords": { "lat": -27.604295603456524, "lng": -55.32620620917985 }},
          {"coords": { "lat": -25.67056463752725, "lng": -54.04429943499859  }},
          {"coords": { "lat": -27.20267693505021, "lng": -54.979648118039385 }},
          {"coords": { "lat": -27.333206746336185, "lng": -55.05589815292741 }},
          {"coords": { "lat": -26.9304215376729, "lng": -55.05772684370853   }},
          {"coords": { "lat": -27.634244288874097, "lng": -55.4974810753026  }},
          {"coords": { "lat": -27.37749767754587, "lng": -54.35336809370743  }},
          {"coords": { "lat": -27.47401437260829, "lng": -54.52364384894633  }},
          {"coords": { "lat": -26.65718094947135, "lng": -54.739688957745244 }},
          {"coords": { "lat": -25.97237727124737, "lng": -54.56859306064801  }},
          {"coords": { "lat": -26.714602171664783, "lng": -54.81334706445646 }},
          {"coords": { "lat": -27.296424940626757, "lng": -54.19936593209811 }},
          {"coords": { "lat": -26.40402231730964, "lng": -54.63147208681554  }},
          {"coords": { "lat": -26.81923049950089, "lng": -54.95741194455666  }},
          {"coords": { "lat": -27.446901173996654, "lng": -55.861175140624894}},
          {"coords": { "lat": -27.426420442175345, "lng": -55.16951380163341 }},
          {"coords": { "lat": -27.19053893828913, "lng": -55.46937867344797  }},
          {"coords": { "lat": -27.523756512460395, "lng": -55.16038355552672 }},
          {"coords": { "lat": -27.041672007771588, "lng": -55.230439859160086}},
          {"coords": { "lat": -26.567457363444692, "lng": -54.75605120178769 }},
          {"coords": { "lat": -27.488548942429613, "lng": -55.124598069955276}},
          {"coords": { "lat": -27.722578461496497, "lng": -54.91393563424307 }},
          {"coords": { "lat": -26.471473456650436, "lng": -54.69735050411617 }},
          {"coords": { "lat": -27.387615710960926, "lng": -55.917650370269016}},
          {"coords": { "lat": -26.025426362351386, "lng": -54.61469286859864 }},
          {"coords": { "lat": -25.606751378530443, "lng": -54.57367040557659 }},
          {"coords": { "lat": -26.80891583309687, "lng": -55.0227042893177   }},
          {"coords": { "lat": -26.971868413333677, "lng": -55.051429632821446}},
          {"coords": { "lat": -27.0864681213142, "lng": -54.83381518594062   }},
          {"coords": { "lat": -26.058688571679347, "lng": -53.73612431349883 }},
          {"coords": { "lat": -27.43150398655925, "lng": -55.872015229852344 }},
          {"coords": { "lat": -27.2566731407395, "lng": -55.53415615361272   }},
          {"coords": { "lat": -27.868854917787456, "lng": -55.137142243462584}},
          {"coords": { "lat": -26.61907958348452, "lng": -54.10785115589416  }},
          {"coords": { "lat": -26.99136550970067, "lng": -54.47656213097399  }},
          {"coords": { "lat": -27.519208422139606, "lng": -54.727675191769706}},
          {"coords": { "lat": -27.142141215151696, "lng": -55.410377476644335}},
          {"coords": { "lat": -27.464457668202908, "lng": -55.11951971565244 }},
          {"coords": { "lat": -27.749092807196295, "lng": -57.62068405367426 }},
          {"coords": { "lat": -28.510633285027016, "lng": -59.043787436637   }},
          {"coords": { "lat": -27.48214974924278, "lng": -58.810955862630564 }},
          {"coords": { "lat": -29.785718170073018, "lng": -58.06388590757164 }},
          //{"coords": { "lat": -27.682111612778993, "lng": -60.90846760754719 }},
          {"coords": { "lat": -27.950197525844597, "lng": -58.80436168880873 }},
          {"coords": { "lat": -29.14565954764535, "lng": -59.257760824181936 }},
          {"coords": { "lat": -27.273129330590606, "lng": -58.244665690584625}},
          {"coords": { "lat": -27.589809297288173, "lng": -56.6948163398936  }},
          {"coords": { "lat": -29.181189153845082, "lng": -58.078986595002064}},
          {"coords": { "lat": -30.61759331140179, "lng": -57.97081841738888  }},
          {"coords": { "lat": -30.251542809694435, "lng": -57.64203455822814 }},
          {"coords": { "lat": -29.338572726469373, "lng": -58.60768032930082 }},
          {"coords": { "lat": -28.252177921146796, "lng": -58.62462832599302 }},
          {"coords": { "lat": -27.746820479730708, "lng": -55.89511628317218 }},
          {"coords": { "lat": -27.50917681529632, "lng": -58.55754056743847  }},
          {"coords": { "lat": -28.575116512363078, "lng": -58.71131962077284 }},
          {"coords": { "lat": -28.984294080333747, "lng": -59.10325282622409 }},
          {"coords": { "lat": -28.267192785414608, "lng": -58.12364016143958 }},
          {"coords": { "lat": -29.093289400914667, "lng": -56.54938001802832 }},
          {"coords": { "lat": -28.04796494628488, "lng": -56.018846982710436 }},
          {"coords": { "lat": -29.17444908571127, "lng": -56.644727654316384 }},
          {"coords": { "lat": -29.711734558276575, "lng": -57.09537619186517 }},
          {"coords": { "lat": -28.55403266367826, "lng": -56.04181315821154  }},
          {"coords": { "lat": -30.01681211923759, "lng": -59.526909977917406 }},
          {"coords": { "lat": -30.74086558040386, "lng": -59.63384392179928  }},
          {"coords": { "lat": -30.589955012194633, "lng": -58.46979988486012 }},
          {"coords": { "lat": -30.383516689026848, "lng": -58.75168248896176 }},
          {"coords": { "lat": -30.94406233045836, "lng": -59.782339964367786 }},
          {"coords": { "lat": -30.085593169779397, "lng": -58.78604325211336 }}
        ],
        "mapOptions": {
          "center": { "lat": -40.855714176253514, "lng": -58.94998504887988 },
          "fullscreenControl": true,
          "mapTypeControl": false,
          "streetViewControl": false,
          "zoom": 6,
          "zoomControl": true,
          "maxZoom": 17,
          "styles": [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "transit",
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              featureType: "road",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            }
          ]
        },
        "mapsApiKey": "AIzaSyCIFKoyaIQUJ499_br-rzpTCR4l1G1P6kE",
        "capabilities": {
          "input": false,
          "autocomplete": false,
          "directions": false,
          "distanceMatrix": false,
          "details": false,
          "actions": true
        }
      });
    };

    initializeMap();
  }, []);

  const locator = document.querySelector('gmpx-store-locator');
  if (locator && locator.shadowRoot) {
    const primeraCapa = locator.shadowRoot.querySelector('gmpx-split-layout');

    if (primeraCapa) {

      const segundaCapa = primeraCapa.querySelector('gmpx-overlay-layout');

      if (segundaCapa) {

        segundaCapa.style.display = 'none !important';

        const shadowRootPrimeraCapa = primeraCapa.shadowRoot;

        const divShadowRootSegundaCapa = shadowRootPrimeraCapa.querySelector('.fixed-container');

        divShadowRootSegundaCapa.style.display = 'none';
      }
    }
  }

  return (
    <div style={{ height: '50rem', width: '100%'}}>
      <gmpx-api-loader key="YOUR_API_KEY_HERE" solution-channel="GMP_QB_locatorplus_v10_cF"></gmpx-api-loader>
      <gmpx-store-locator
        map-id="DEMO_MAP_ID"
      ></gmpx-store-locator>
    </div>
  );
}
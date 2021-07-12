
export default {
    DEFAULT_TIME_OUT: 300,
    DEFAULT_COUNTRY_CODE: '+84',
    DEFAULT_COUNTRY_ISO_CODE: 'VN',
    MAP_URL: "https://maps.googleapis.com/maps/api/geocode/json?address=",
    MAP_KEY: "AIzaSyApDHn_nNDkmjYbmqjM3QWmLLvoAbjCJQ0",
    // MAP_KEY: "AIzaSyDH1vw4QBC5-zkthmJIdEHtyC_Nn98V1Cg",
    HTTP_OK: "OK",
    AUTH_API_URL: 'http://vsos-pre-auth-alb-502302266.ap-northeast-2.elb.amazonaws.com',
    API_URL: 'http://vsos-pre-mobileapi-alb-885452131.ap-northeast-2.elb.amazonaws.com',

    //Auth Server API
    AUTH_API_URL_DEV: 'http://vsos-pre-auth-alb-502302266.ap-northeast-2.elb.amazonaws.com',
    AUTH_API_URL_PRE_PROD: 'http://vsos-pre-auth-alb-502302266.ap-northeast-2.elb.amazonaws.com',
    AUTH_API_URL_PROD: 'http://vsos-pre-auth-alb-502302266.ap-northeast-2.elb.amazonaws.com',

    //Mobile Server API
    API_URL_DEV: '192.168.0.13:8210',
    API_URL_PRE_PROD: 'http://vsos-pre-mobileapi-alb-885452131.ap-northeast-2.elb.amazonaws.com',
    API_URL_PROD: 'http://vsos-pre-mobileapi-alb-885452131.ap-northeast-2.elb.amazonaws.com',

    ENVIRONMENT: {
        DEV: "DEV",
        PRE_PROD: "PRE_PROD",
        PROD: "PROD"
    },
}

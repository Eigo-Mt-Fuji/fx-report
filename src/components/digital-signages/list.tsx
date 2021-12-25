import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './neumorphism.css';
import {DigitalSignageListProps} from '../../types';
import QRCode from 'react-qr-code';
import { Carousel } from 'react-bootstrap';

// QRコード一覧表示用のデジタルサイネージ画面を作る
// 白黒 . 余白 , ベースカラー + アクセントカラーで構築してみる
// bootstrap
const DigitalSignageList = (props: DigitalSignageListProps): any => {
    const qrItems = [
        {
            name: 'Google',
            size: 160,
            content: 'https://www.google.co.jp'
        },
        {
            name: 'ローカルホスト',
            size: 160,
            content: 'http://localhost:3000/html/pages/sign-in.html'
        },
        {
            name: '龍が如く動画(Youtube)',
            size: 160,
            content: 'https://www.youtube.com/watch?v=WQhNn_lL3O4'
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const onChangeQrSearchWord = (e:any) => {
        console.log(e.target.value);
        const word = e.target.value;
        const match = qrItems.findIndex((item, index) => {
            if ( item.name.indexOf(word) >= 0) {
                return true;
            }
            return false;
        });
        if ( match >= 0 ) {
            console.log(word);
            console.log(match);
            setActiveIndex(match);
        }
    };
    const onSelectActiveIndex = (eventKey:number, e:any) => {
        let nextActiveIndex = activeIndex;

        if ( e.target.className == 'carousel-control-next-icon') {

            nextActiveIndex = (activeIndex + 1) % qrItems.length;
        }else {

            nextActiveIndex = (activeIndex - 1 + qrItems.length) % qrItems.length;
        }

        setActiveIndex(nextActiveIndex);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h2 className="h5 text-center mb-6">{props.title}</h2>
                </div>
            </div>
            <form action="#" className="mt-4">
                <div className="form-group">
                    <label forname="qrLabel">QRコードラベル</label>
                    <div className="input-group mb-4">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <span className="fas fa-search-dollar"></span>
                            </span>
                        </div>
                        <input className="form-control" id="qrLabel" placeholder="XXX" type="text" aria-label="qr label" onChange={onChangeQrSearchWord}/>
                    </div>
                </div>
            </form>
            <div className="row justify-content-center">
                <div className="col-md-10">
                <Carousel interval={null} indicators={false} activeIndex={activeIndex} onSelect={onSelectActiveIndex}>

                    {qrItems.map( (item: any) => (
                        <Carousel.Item key={item.name}>
                            <div className="w-100 row d-flex justify-content-center">
                                <div className="col col-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                                    <QRCode 
                                        className="d-block d-flex justify-content-center"
                                        value={ item.content } 
                                        size={item.size} 
                                        bgColor="#FFFFFF" 
                                        fgColor="#000000"
                                        level="L" ></QRCode>
                                </div>
                            </div>
                            <div className="w-100 row d-flex justify-content-center">
                                <h3>{item.name}</h3>
                            </div>
                        </Carousel.Item>)
                    )}
                </Carousel>
                </div>
            </div>
        </div>
    );
};

export default DigitalSignageList;

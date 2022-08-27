import { SPFI } from '@pnp/sp';
import * as React from 'react';
import { useEffect, useState } from "react";
import { IFAQ, ICarmodels } from "../../../interfaces";
import { getSP } from '../../../npnjsConfig';

// import styles from './AugustEnd.module.scss';
import { IAugustEndProps } from './IAugustEndProps';

const AugustEnd = (props: IAugustEndProps) => {
  
  const LOG_SOURCE = 'August Webpart';
  const LIST_NAME = 'FAQ';
  const LIST_NAME1 = "Carmodels";
  let _sp: SPFI = getSP(props.context);

  const [faqItems, setFaqItems] = useState<IFAQ[]>([])

  const [cars, setCars] = useState<ICarmodels[]>([]);

  const getFAQItems = async () => {
    console.log('context', _sp);
    const items = await _sp.web.lists.getByTitle(LIST_NAME).items();

    console.log('FAQ Items', items);

    setFaqItems(items);

  };

  const getCarmodels = async () => {
     console.log("context", _sp);
    const carmodelsList = await _sp.web.lists.getByTitle(LIST_NAME1).items();
    console.log("Car Items", carmodelsList);
    setCars(carmodelsList);
  }

  useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getFAQItems();
    
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getCarmodels();

  }, []);

  return (
    <div>
      <h1>Hello Saiid!</h1>
      <hr />
      <div>
        {faqItems.map((item, index) => (
          <div key={index}>
            <h1>{item.Title}</h1>
            <h3>{item.Body}</h3>
            <h3>{item.Id}</h3>
            <h3>{item.Letter}</h3>
          </div>
        ))}
      </div>
      <hr />
      <div>
        {cars.map((car, index) => (
          <div key={car.model}>
            <h1>{ car.brand}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AugustEnd;

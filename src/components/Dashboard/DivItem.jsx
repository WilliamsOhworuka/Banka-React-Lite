/* eslint-disable react/prop-types */
import React from 'react';

const convert = (date, credit, Styles) => {
  const a = date.slice(2, 10).split('-').reverse().join('/');
  return (
    <>
      <span className={credit ? Styles.cr : Styles.db}>{a.slice(0, 2)}</span>
      <span>{a.slice(2, 10)}</span>
    </>
  );
};

const DivItem = ({
  first, type, content, Styles, index, handleClick,
}) => {
  let one; let two; let three; let four; let five;
  let six; let sign;
  const account = type === 'account';
  const activity = type === 'activity';

  if (account) {
    ({
      accountnumber: one, type: two, balance: four, status: five, accountname: three,
    } = content);
  } else {
    ({
      createdon: one, accountnumber: six, amount: four, type: five,
    } = content);
    const credit = five === 'credit';
    sign = credit ? '+' : '-';
    one = convert(one, credit, Styles);
    three = `${five} from bankabot`;
  }
  return (
    <div
      className={account && first ? `${Styles.item} ${Styles.top}` : Styles.item}
      role="presentation"
      onClick={handleClick ? () => handleClick(index) : null}
    >
      <div className={Styles.first}>
        <p className={Styles.one}>{one}</p>
        {account ? <p className={Styles.sub}>{two}</p> : null}
      </div>
      <div className={Styles.second}>
        <p className={Styles.main}>{three}</p>
        {activity ? <p className={Styles.sub}>{six}</p> : null}
      </div>
      <div className={Styles.third}>
        <p className={five === 'credit' ? `${Styles.credit}` : `${Styles.debit}`}>{`${sign || ''}\u20A6${four}`}</p>
        {account ? <p className={`${Styles.sub} ${Styles.status}`}>{five}</p> : null}
      </div>
    </div>
  );
};

export default DivItem;

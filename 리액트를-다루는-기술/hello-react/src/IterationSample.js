import React, { useState } from 'react';

const IterationSmaple = () => {
  const [names, setNames] = useState([
    { id: 1, text: 'snow' },
    { id: 2, text: 'ice' },
    { id: 3, text: 'wind' },
  ]);
  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(4); // 1, 2, 3 있으니까 4 부터 시작

  const onChange = (e) => setInputText(e.target.value);
  const onCLick = () => {
    // 불변성 유지를 위해 push 대신 concat 사용
    const nextNames = names.concat({
      id: nextId,
      text: inputText,
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  };
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const namesList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));
  return (
    <>
      <input vlaue={inputText} onChange={onChange} />
      <button onClick={onCLick}>Add</button>
      <ul>{namesList}</ul>
    </>
  );
};

export default IterationSmaple;

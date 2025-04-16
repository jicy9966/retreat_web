import React, { useState, useEffect, useRef } from 'react';
import './TreasureHunt.scss';

// Terminal icon as inline SVG
const TerminalIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="terminal-svg-icon"
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const TreasureHunt = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: '보물찾기 터미널에 오신 것을 환영합니다!' },
    { type: 'system', text: '안내원: 안녕하세요! 보물찾기에 참여하신 것을 환영합니다.' },
    { type: 'system', text: '안내원: 이 터미널에서 다양한 명령어를 입력하여 보물을 찾아보세요.' },
    { type: 'system', text: '안내원: 시작하려면 "help"를 입력해보세요.' }
  ]);
  
  const [availableCommands, setAvailableCommands] = useState(['help']);
  const [puzzles, setPuzzles] = useState({
    '첫번째문제': {
      solved: false,
      question: '터미널에서 파일을 확인하는 명령어는 무엇일까요? (영어로 두 단어를 입력하세요)',
      answer: 'list files',
      reward: '새로운 명령어: list files'
    },
    '두번째문제': {
      solved: false,
      question: '암호는 "terminal"의 각 글자를 알파벳에서 한 글자씩 앞으로 이동한 결과입니다. (힌트: a→z, b→a)',
      answer: 'sdqlhm`k',
      reward: '첫번째 단서의 비밀번호: treasure1'
    },
    '세번째문제': {
      solved: false,
      question: '다음 수열의 다음 숫자는 무엇일까요? 2, 3, 5, 8, 13, ?',
      answer: '21',
      reward: '두번째 단서의 비밀번호: treasure2'
    },
    '네번째문제': {
      solved: false,
      question: '보물을 찾는 영어 단어를 입력하세요. (힌트: 이 활동의 이름)',
      answer: 'treasure hunt',
      reward: '세번째 단서의 비밀번호: treasure3'
    },
    '다섯번째문제': {
      solved: false,
      question: '모든 퍼즐을 풀고 얻은 지식으로 암호를 해독하세요: TFBSDI GPS UIF USFBTVSF',
      answer: 'search for the treasure',
      reward: '네번째 단서의 비밀번호: treasure4'
    }
  });
  
  const [passwords, setPasswords] = useState({
    '첫번째단서': 'treasure1',
    '두번째단서': 'treasure2',
    '세번째단서': 'treasure3',
    '네번째단서': 'treasure4'
  });
  
  const [files, setFiles] = useState({
    '보물찾기점수': '아직 점수가 기록되지 않았습니다.',
    '두번째문제': puzzles['두번째문제'].question,
    '첫번째단서': {
      locked: true,
      content: '정보 - "보물을 찾으려면 스태프 A나 B한테 찾아가세요."'
    },
    '세번째문제': puzzles['세번째문제'].question,
    '두번째단서': {
      locked: true,
      content: '정보 - "찾아가기 전 성경 구절을 암송해야 할거야. 단, ..."'
    },
    '네번째문제': puzzles['네번째문제'].question,
    '세번째단서': {
      locked: true,
      content: '정보 - "구절은 사무엘상 30:21~25이고..."'
    },
    '다섯번째문제': puzzles['다섯번째문제'].question,
    '네번째단서': {
      locked: true,
      content: '정보 - "다섯명이 한 명당 한구절씩만 암송해."'
    }
  });
  
  const [pendingPassword, setPendingPassword] = useState(null);
  const [score, setScore] = useState(0);
  
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedInput = input.trim().toLowerCase();
    
    if (trimmedInput === '') return;
    
    const newHistoryItem = { type: 'user', text: `> ${input}` };
    const newHistory = [...history, newHistoryItem];
    
    // Add to history and clear input
    setHistory(newHistory);
    setInput('');
    
    // Process pending password inputs
    if (pendingPassword) {
      processPasswordInput(trimmedInput, pendingPassword);
      return;
    }
    
    // Process commands
    processCommand(trimmedInput, newHistory);
  };
  
  const processPasswordInput = (input, fileToUnlock) => {
    if (input === passwords[fileToUnlock]) {
      // Correct password
      const newFiles = { ...files };
      newFiles[fileToUnlock].locked = false;
      setFiles(newFiles);
      
      setHistory([
        ...history, 
        { type: 'user', text: `> [비밀번호 입력]` },
        { type: 'success', text: `비밀번호가 맞습니다! ${fileToUnlock}가 열렸습니다.` },
        { type: 'content', text: newFiles[fileToUnlock].content }
      ]);
      
      setScore(score + 100);
      setPendingPassword(null);
    } else {
      // Wrong password
      setHistory([
        ...history, 
        { type: 'user', text: `> [비밀번호 입력]` },
        { type: 'error', text: '비밀번호가 틀렸습니다. 다시 시도하세요.' }
      ]);
      setPendingPassword(null);
    }
  };
  
  const processCommand = (command, currentHistory) => {
    // Check if the input is an answer to a puzzle
    const puzzleEntry = Object.entries(puzzles).find(([_, puzzle]) => 
      !puzzle.solved && puzzle.answer.toLowerCase() === command
    );
    
    if (puzzleEntry) {
      const [puzzleKey, puzzle] = puzzleEntry;
      
      // Mark as solved
      const newPuzzles = { ...puzzles };
      newPuzzles[puzzleKey].solved = true;
      setPuzzles(newPuzzles);
      
      // Add new command if it's the first puzzle
      if (puzzleKey === '첫번째문제') {
        setAvailableCommands([...availableCommands, 'list files']);
      }
      
      // Update history
      setHistory([
        ...currentHistory,
        { type: 'success', text: `정답입니다! ${puzzle.reward}` }
      ]);
      
      // Update score
      setScore(score + 200);
      return;
    }
    
    // Process regular commands - FIXED to check for the full command string
    // Check for exact matches first (for multi-word commands)
    if (availableCommands.includes(command)) {
      // Handle exact match commands
      if (command === 'help') {
        const helpText = [
          '사용 가능한 명령어:',
          ...availableCommands.map(cmd => `  - ${cmd}`)
        ];
        
        if (!puzzles['첫번째문제'].solved) {
          helpText.push('첫번째 문제:', puzzles['첫번째문제'].question);
        }
        
        setHistory([
          ...currentHistory,
          { type: 'system', text: helpText.join('\n') }
        ]);
      } else if (command === 'list files') {
        const fileNames = Object.keys(files).map(name => {
          if (typeof files[name] === 'object' && files[name].locked) {
            return `🔒 ${name}`;
          }
          return name;
        });
        
        setHistory([
          ...currentHistory,
          { type: 'system', text: '파일 목록:' },
          { type: 'system', text: fileNames.join('\n') },
          { type: 'system', text: '안내원: "파일들을 잘 찾았군요. view를 사용해서 열람하세요."' }
        ]);
        
        // Add view command if not already available
        if (!availableCommands.includes('view')) {
          setAvailableCommands([...availableCommands, 'view']);
        }
      }
    } else {
      // Check for single-word commands or commands with arguments
      const parts = command.split(' ');
      const mainCommand = parts[0];
      
      if (mainCommand === 'view') {
        if (parts.length < 2) {
          setHistory([
            ...currentHistory,
            { type: 'error', text: '파일 이름을 입력하세요. (예: view 보물찾기점수)' }
          ]);
          return;
        }
        
        const fileName = parts.slice(1).join(' ');
        
        if (!Object.keys(files).includes(fileName)) {
          setHistory([
            ...currentHistory,
            { type: 'error', text: `파일을 찾을 수 없습니다: ${fileName}` }
          ]);
          return;
        }
        
        if (typeof files[fileName] === 'object' && files[fileName].locked) {
          setHistory([
            ...currentHistory,
            { type: 'system', text: `${fileName} 파일은 잠겨 있습니다. 비밀번호를 입력하세요:` }
          ]);
          setPendingPassword(fileName);
        } else {
          // File is not locked or is a string
          const content = typeof files[fileName] === 'object' ? files[fileName].content : files[fileName];
          setHistory([
            ...currentHistory,
            { type: 'system', text: `--- ${fileName} ---` },
            { type: 'content', text: content }
          ]);
        }
      } else {
        // Unknown command
        setHistory([
          ...currentHistory,
          { type: 'error', text: `알 수 없는 명령어: ${mainCommand}. 'help'를 입력하여 사용 가능한 명령어를 확인하세요.` }
        ]);
      }
    }
  };
  
  const getTextClass = (type) => {
    switch (type) {
      case 'user':
        return 'user-text';
      case 'system':
        return 'system-text';
      case 'error':
        return 'error-text';
      case 'success':
        return 'success-text';
      case 'content':
        return 'content-text';
      default:
        return '';
    }
  };
  
  return (
    <div className="treasure-hunt-terminal">
      <div className="terminal-header">
        <div className="terminal-icon">
          <TerminalIcon />
        </div>
        <div className="terminal-title">보물찾기 터미널</div>
        <div className="terminal-score">점수: {score}</div>
      </div>
      
      <div 
        ref={terminalRef}
        className="terminal-body"
      >
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${getTextClass(item.type)}`}>
            {item.text.split('\n').map((line, lineIndex) => (
              <div key={lineIndex}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="terminal-input-area">
        <div className="terminal-prompt">
          <span className="prompt-symbol">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className="terminal-input"
            placeholder={pendingPassword ? "비밀번호를 입력하세요..." : "명령어를 입력하세요..."}
            autoFocus
          />
        </div>
      </form>
    </div>
  );
};

export default TreasureHunt;
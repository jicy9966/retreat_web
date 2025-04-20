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
    { type: 'system', text: '안녕하세요! 보물찾기에 참여하신 것을 환영합니다.' },
    { type: 'system', text: '이 터미널에서 다양한 명령어를 입력하여 보물을 찾아보세요.' },
    { type: 'system', text: '시작하려면 "help"를 입력해보세요.' }
  ]);
  
  const [availableCommands, setAvailableCommands] = useState(['help', 'clear']);
  const [puzzles, setPuzzles] = useState({
    '첫번째문제': {
      solved: false,
      question: '터미널에서 파일을 확인하는 명령어는 무엇일까요? (영어로 두 단어를 입력하세요)\n힌트: li__ _ile_',
      answer: 'list files',
      reward: '새로운 명령어: list files'
    },
    '두번째문제': {
      solved: false,
      question: '조원 전원이 각 분야별 도우미 한 명과 사진을 찍어야합니다:\n- 레크레이션\n- 주방\n- 미디어\n- 목회진\n찍은 사진을 수양회 네컷으로 만들어 조수민 셀목자에게\n제출해 인증을 받으세요.',
      answer: 'none',
      reward: 'none'
    },
    '세번째문제': {
      solved: false,
      question: '<33 39 36.9 N, 117 24 14.6 ?>',
      answer: 'none',
      reward: 'none'
    },
    '네번째문제': {
      solved: false,
      question: 'FAQ',
      answer: 'none',
      reward: 'none'
    },
    '다섯번째문제': {
      solved: false,
      question: '요 문제만 정하면 됩니다',
      answer: 'none',
      reward: 'none'
    }
  });
  
  const [passwords, setPasswords] = useState({
    '🔑 첫번째단서': '8282',
    '🔑 두번째단서': '1472',
    '🔑 세번째단서': 'graceandrest',
    '🔑 네번째단서': 'treasure4',
    '🧩 이게뭘까': 'qkm888',  // Password for third problem
    '🧩 해독해봐': 'decrypt',  // Password for fourth problem
    '🧩 사진이야': 'uqid25'  // Password for fifth problem
  });
  
  const [files, setFiles] = useState({
    '📋 게임규칙': '잘 오셨습니다.\n이 게임은 여러 퍼즐들을 풀어 내서 최종 행동 지령을\n알아내는 것이 목적입니다. 최종 행동 지령을 수행하는\n 순서대로 다음과 같이 점수를 지급합니다.\n 1등: 25점\n 2등: 15점\n 3등: 10점\n\n* 퍼즐을 풀어내는데 인터넷의 도움을 받아도 좋습니다.\n도움이 될진 모르겠지만 말이죠.\n* 단서를 찾는 과정중 다른 조에게 들키지 않도록 조심하십시오.\n* 단서를 찾고 파기하는 것은 불가능합니다.',
    '🧩 챌린지': puzzles['두번째문제'].question,
    '🔑 첫번째단서': {
      locked: true,
      content: '정보 - "최종 행동 지령을 알게 되면 조수민 셀목자에게 찾아가..."\n\n이게뭘까 파일을 열람할 수 있는 암호: qkm888',
      type: 'clue'
    },
    '🧩 이게뭘까': {
      locked: true,
      content: puzzles['세번째문제'].question,
      type: 'puzzle'
    },
    '🔑 두번째단서': {
      locked: true,
      content: '정보 - "찾아가기 전 성경 구절을 암송해야 할거야. 단, ..."\n해독해봐 파일을 열람할 수 있는 암호: decrypt',
      type: 'clue'
    },
    '🧩 해독해봐': {
      locked: true,
      content: puzzles['네번째문제'].question,
      type: 'puzzle'
    },
    '🔑 세번째단서': {
      locked: true,
      content: '정보 - "구절은 사무엘상 30:21~25이고..."\n사진이야 파일을 열람할 수 있는 암호: uqid25',
      type: 'clue'
    },
    '🧩 사진이야': {
      locked: true,
      content: puzzles['다섯번째문제'].question,
      type: 'puzzle'
    },
    '🔑 네번째단서': {
      locked: true,
      content: '정보 - "다섯명이 한 명당 한구절씩만 암송해."',
      type: 'clue'
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
          '‎',
          '=== 보물찾기의 목표 ===',
          '이 보물찾기의 최종 목표는 특정 행동을 수행하는 것입니다.',
          '터미널을 통해 총 4개의 단서를 수집할 수 있습니다.',
          '모든 단서를 모으면 최종 행동 지령을 알 수 있습니다.',
          '팀은 이 행동 지령을 수행하여 보물찾기를 완료해야 합니다.',
          '‎',
          '=== 터미널 사용법 ===',
          '적절한 명령어를 입력하여 원하는 파일을 열람할 수 있습니다.',
          '아래 현재 사용 가능한 명령어들입니다.',
          '‎',
          '=== 사용 가능한 명령어 ===',
          ...availableCommands.map(cmd => `  ㄴ ${cmd}`),
          '‎'
        ];
        
        if (!puzzles['첫번째문제'].solved) {
          helpText.push('', '첫번째 문제:', puzzles['첫번째문제'].question);
        }
        
        setHistory([
          ...currentHistory,
          { type: 'system', text: helpText.join('\n') }
        ]);
      } else if (command === 'list files') {
        // Group files by category
        const puzzleFiles = [];
        const clueFiles = [];
        const otherFiles = [];
        
        Object.keys(files).forEach(name => {
          const file = files[name];
          const prefix = (typeof file === 'object' && file.locked) ? '🔒 ' : '';
          
          if (name.includes('🧩')) {
            puzzleFiles.push(`ㄴ ${prefix}${name}`);
          } else if (name.includes('🔑')) {
            clueFiles.push(`ㄴ ${prefix}${name}`);
          } else {
            otherFiles.push(`ㄴ ${prefix}${name}`);
          }
        });
        
        setHistory([
          ...currentHistory,
          { type: 'system', text: '=== 파일 목록 ===' },
          { type: 'system', text: '📚 일반 파일:' },
          { type: 'system', text: otherFiles.join('\n') },
          { type: 'system', text: '🧩 퍼즐:' },
          { type: 'system', text: puzzleFiles.join('\n') },
          { type: 'system', text: '🔑 단서:' },
          { type: 'system', text: clueFiles.join('\n') },
          { type: 'system', text: '‎' },
          { type: 'system', text: '파일들을 잘 찾았군요. view 명령어를 사용해서 열람하세요. \n예) view 게임규칙' }
        ]);
        
        // Add view command if not already available
        if (!availableCommands.includes('view')) {
          setAvailableCommands([...availableCommands, 'view']);
        }
      } else if (command === 'clear') {
        // Clear terminal history but keep initial welcome messages
        setHistory([
          { type: 'system', text: '안녕하세요! 보물찾기에 참여하신 것을 환영합니다.' },
          { type: 'system', text: '이 터미널에서 다양한 명령어를 입력하여 보물을 찾아보세요.' },
          { type: 'system', text: '시작하려면 "help"를 입력해보세요.' }
        ]);
      }
    } else {
      // Check for single-word commands or commands with arguments
      const parts = command.split(' ');
      const mainCommand = parts[0];
      
      if (mainCommand === 'view') {
        if (parts.length < 2) {
          setHistory([
            ...currentHistory,
            { type: 'error', text: '파일 이름을 입력하세요. (예: view 게임규칙)' }
          ]);
          return;
        }
        
        const searchName = parts.slice(1).join(' ').toLowerCase();
        
        // Find file by partial match (ignoring emojis)
        const fileName = Object.keys(files).find(name => 
          name.toLowerCase().includes(searchName) || 
          name.replace(/[^\w\s\-가-힣]/g, '').toLowerCase().includes(searchName)
        );
        
        if (!fileName) {
          setHistory([
            ...currentHistory,
            { type: 'error', text: `파일을 찾을 수 없습니다: ${searchName}` }
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
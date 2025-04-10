import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodayScripture, getScriptureByDate } from '../../config/scriptures';
import './QTinPage.scss';

const QTinPage = () => {
    const navigate = useNavigate();
    const { date } = useParams();
    const [scripture, setScripture] = useState(null);

    useEffect(() => {
        if (date) {
            // If a specific date is provided in the URL
            const scriptureData = getScriptureByDate(date);
            if (scriptureData) {
                setScripture(scriptureData);
            } else {
                // If no scripture found for the date, use today's
                setScripture(getTodayScripture());
            }
        } else {
            // Default to today's scripture
            setScripture(getTodayScripture());
        }
    }, [date]);

    if (!scripture) {
        return <div className="loading">Loading scripture...</div>;
    }

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">QTin - 오늘의 큐티 본문</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={() => navigate("/home")}>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="bible-study-container">
                    <div className="bible-study-page">
                        <div className="left-column">
                            <div className="header">
                                <div className="lesson-number">
                                    <span className="lesson-count">{scripture.lessonNumber}</span> {scripture.lessonTitle}
                                </div>
                                <div className="metadata">
                                    <span className="date-ref">{scripture.month} / {scripture.dayOfWeek} | <strong>{scripture.reference}</strong></span>
                                </div>
                            </div>

                            {scripture.sections && scripture.sections.map((section, index) => (
                                <div key={index} className="scripture-section">
                                    <div className="section-title">{section.title}</div>
                                    <div className="scripture-text">
                                        {section.verses.map((verse, vIndex) => (
                                            <span key={vIndex}>
                                                <span className="verse-number">{verse.number}</span> {verse.text}{' '}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="notes-section">
                                <div className="note-title">도움말</div>
                                {scripture.notes && scripture.notes.map((note, index) => (
                                    <div className="note-item" key={index}>
                                        <span className="note-term">{note.term}:</span> {note.definition}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="right-column">
                            <div className="right-content">
                                <div className="scripture-summary">
                                    <div className="summary-title">본문요약</div>
                                    <p>{scripture.summary}</p>
                                </div>

                                <div className="interaction-section">
                                    <div className="section-label">질문하기</div>
                                    <div className="input-area"></div>

                                    <div className="section-label">묵상하기</div>
                                    <div className="input-area"></div>

                                    <div className="section-label">적용하기</div>
                                    <div className="input-area"></div>

                                    <div className="section-label">기도하기</div>
                                    <div className="input-area"></div>

                                    <div className="intercessory-prayer">
                                        <p>{scripture.prayer}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QTinPage;
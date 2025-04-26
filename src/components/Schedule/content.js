import React from "react";

const Content = ({ day = "day1", viewMode = "list" }) => {
    const scheduleData = {
        day1: [
            { time: "01:00 PM", activity: "선발대 출발" },
            { time: "05:00 PM", activity: "본대 출발 / \n안내 및 접수" },
            { time: "07:00 PM", activity: "저녁 식사" },
            { time: "08:00 PM", activity: "오리엔테이션 OT" },
            { time: "08:30 PM", activity: "저녁 집회 1일차" },
            { time: "11:30 PM", activity: "조 모임" },
            { time: "12:00 AM", activity: "취침" }
        ],
        day2: [
            { time: "08:00 AM", activity: "기상 / \n아침 식사" },
            { time: "10:00 AM", activity: "QT모임" },
            { time: "10:30 AM", activity: "단체 활동 (골든벨)" },
            { time: "12:00 PM", activity: "점심 시간" },
            { time: "02:00 PM", activity: "레크레이션 (지락실)" },
            { time: "06:00 PM", activity: "저녁 식사" },
            { time: "07:30 PM", activity: "휴식 및 집회 준비" },
            { time: "08:00 PM", activity: "저녁 집회 2일차" },
            { time: "11:00 PM", activity: "조 모임" },
            { time: "12:00 AM", activity: "취침" }
        ],
        day3: [
            { time: "08:00 AM", activity: "기상 & 아침 식사" },
            { time: "10:00 AM", activity: "Self Reflection \n& 간증" },
            { time: "10:30 AM", activity: "정리 및 귀가 준비" },
            { time: "11:00 AM", activity: "교회로 귀가" },
            { time: "02:00 PM", activity: "주일 예배" }
        ]
    };

    // Function to format activity text with line breaks and indentation
    const formatActivity = (text) => {
        if (!text.includes('\n')) return text;

        const lines = text.split('\n');
        return (
            <div>
                {lines.map((line, i) => (
                    <div key={i} style={{
                        marginTop: i > 0 ? '3px' : '0',
                    }}>
                        {i > 0 ? '' + line : line}
                    </div>
                ))}
            </div>
        );
    };

    const renderList = () => {
        return (
            <div style={{ textAlign: "left", padding: "5px 15px" }}>
                <h3 style={{
                    textAlign: "center",
                    margin: "0 0 10px 0",
                    fontFamily: "'PixelFont', 'Courier New', monospace",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    whiteSpace: "pre-wrap"
                }}>
                </h3>
                {scheduleData[day].map((item, index) => (
                    <div key={index} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "8px 0",
                        borderBottom: "1px dotted #999"
                    }}>
                        <span style={{ fontWeight: "bold" }}>{item.time}</span>
                        <span style={{ flex: 1, marginLeft: "15px" }}>{formatActivity(item.activity)}</span>
                    </div>
                ))}
            </div>
        );
    };

    const renderCompact = () => {
        return (
            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "'PixelFont', 'Courier New', monospace",
                fontSize: "12px"
            }}>
                <thead>
                    <tr>
                        <th style={{
                            color: "black",
                            width: "80px",
                            padding: "3px",
                            background: "#c0c0c0",
                            border: "1px solid #999"
                        }}>시간</th>
                        <th style={{
                            color: "black",
                            padding: "3px",
                            background: "#c0c0c0",
                            border: "1px solid #999"
                        }}>일정</th>
                    </tr>
                </thead>
                <tbody>
                    {scheduleData[day].map((item, index) => (
                        <tr key={index} style={{
                            background: index % 2 === 0 ? "#f0f0f0" : "white"
                        }}>
                            <td style={{
                                padding: "3px",
                                textAlign: "center",
                                border: "1px solid #ddd",
                                fontWeight: "bold"
                            }}>{item.time}</td>
                            <td style={{
                                padding: "3px",
                                border: "1px solid #ddd"
                            }}>{item.activity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return viewMode === "list" ? renderList() : renderCompact();
};

export default Content;
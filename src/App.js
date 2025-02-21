import React, { useState } from 'react';
import './App.css';

// ロゴコンポーネント
const Logo = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="23" fill="#FFB7B7" />
    <path d="M15 20 H35 V35 H15 V20" fill="#FFF" stroke="#FF9494" strokeWidth="2" rx="4" />
    <path d="M18 15 H32" stroke="#FF9494" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 25 H28" stroke="#FF9494" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 30 H28" stroke="#FF9494" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

function App() {
  // 状態管理の追加
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // サンプルデータ
  const [applications] = useState([
    {
      id: "APP-2024-001",
      projectName: "○○マンション新築工事",
      location: "東京都渋谷区○○",
      status: "修正依頼中",
      submitDate: "2024-02-15",
      lastUpdate: "2024-02-20",
      urgency: "高",
      revisions: 2
    },
    {
      id: "APP-2024-002",
      projectName: "△△ビル建替工事",
      location: "東京都新宿区△△",
      status: "申請準備中",
      submitDate: "2024-02-18",
      lastUpdate: "2024-02-18",
      urgency: "中",
      revisions: 0
    },
    {
      id: "APP-2024-003",
      projectName: "□□住宅新築工事",
      location: "東京都目黒区□□",
      status: "審査中",
      submitDate: "2024-02-10",
      lastUpdate: "2024-02-19",
      urgency: "低",
      revisions: 1
    }
  ]);

  // 検索とフィルタリングの処理
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && app.status === activeTab;
  });

  // クリックハンドラー
  const handleDetailClick = (app) => {
    alert(`${app.projectName}の詳細情報を表示します。`);
  };

  const handleUpdateClick = (app) => {
    alert(`${app.projectName}の更新画面を表示します。`);
  };
// ステータスに応じた色を返す関数
  const getStatusStyle = (status) => {
    switch (status) {
      case "修正依頼中":
        return { backgroundColor: '#FFE2E2', color: '#FF6B6B' };
      case "申請準備中":
        return { backgroundColor: '#FFF3D4', color: '#FFB039' };
      case "審査中":
        return { backgroundColor: '#E2F0FF', color: '#5AA1FF' };
      default:
        return { backgroundColor: '#F5F5F5', color: '#666666' };
    }
  };
  // 以下、既存のreturn部分のコード...
  return (
    <div className="App" style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#FFF9F9',
      minHeight: '100vh',
      fontFamily: '"M PLUS Rounded 1c", "Segoe UI", sans-serif'
    }}>
      {/* ヘッダー部分 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px',
        padding: '15px',
        backgroundColor: '#FFF',
        borderRadius: '20px',
        boxShadow: '0 4px 15px rgba(255, 183, 183, 0.1)'
      }}>
        <Logo />
        <div>
          <h1 style={{ 
            margin: 0,
            fontSize: '24px', 
            fontWeight: '600',
            color: '#FF9494',
            letterSpacing: '0.5px'
          }}>
            タテマエちゃん
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            fontSize: '14px',
            color: '#FFA7A7'
          }}>
            建築確認申請管理システム
          </p>
        </div>
      </div>
      
      {/* 検索バー */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 案件を検索..."
        style={{
          width: '100%',
          padding: '15px 20px',
          border: '2px solid #FFE2E2',
          borderRadius: '15px',
          fontSize: '16px',
          marginBottom: '20px',
          backgroundColor: '#FFF',
          boxShadow: '0 4px 10px rgba(255, 183, 183, 0.1)',
          outline: 'none'
        }}
      />
      
      {/* タブ */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        padding: '5px',
        backgroundColor: '#FFF',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(255, 183, 183, 0.1)'
      }}>
        {['all', '修正依頼中', '申請準備中', '審査中'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: activeTab === tab ? '#FFE2E2' : 'transparent',
              color: activeTab === tab ? '#FF6B6B' : '#888',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              flex: 1,
              transition: 'all 0.3s ease'
            }}
          >
            {tab === 'all' ? '全案件' : tab}
          </button>
        ))}
      </div>

      {/* 案件一覧 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '25px' 
      }}>
        {filteredApplications.map(app => (
          <div
            key={app.id}
            style={{
              padding: '25px',
              backgroundColor: '#FFF',
              borderRadius: '20px',
              boxShadow: '0 4px 15px rgba(255, 183, 183, 0.1)',
              transition: 'transform 0.2s ease',
              cursor: 'pointer',
              ':hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                marginBottom: '8px',
                color: '#FF9494',
                fontWeight: '600'
              }}>{app.projectName}</h3>
              <p style={{ 
                color: '#888', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                📍 {app.location}
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              <span style={{ color: '#888' }}>#{app.id}</span>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500',
                  ...getStatusStyle(app.status)
                }}
              >
                {app.status}
              </span>
            </div>

            <div style={{ 
              color: '#888', 
              fontSize: '13px',
              display: 'grid',
              gap: '8px',
              padding: '15px',
              backgroundColor: '#FFF9F9',
              borderRadius: '15px'
            }}>
              <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>📅 提出日</span>
                <span>{app.submitDate}</span>
              </p>
              <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>🔄 最終更新</span>
                <span>{app.lastUpdate}</span>
              </p>
              <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>📝 修正回数</span>
                <span>{app.revisions}回</span>
              </p>
              <p style={{ margin: 0, display: 'flex', justifyContent: 'space-between' }}>
                <span>⭐️ 優先度</span>
                <span>{app.urgency}</span>
              </p>
            </div>

            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={() => handleDetailClick(app)}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #FFE2E2',
                  borderRadius: '12px',
                  backgroundColor: '#FFF',
                  color: '#FF9494',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                詳細
              </button>
              <button
                onClick={() => handleUpdateClick(app)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#FF9494',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                更新
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
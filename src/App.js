cd ~/Desktop/my-first-app
cat > src/App.js << 'EOF'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// ロゴコンポーネント
const Logo = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <rect width="50" height="50" fill="#FFF9F4" rx="10" />
    <path d="M10 25 L25 10 L40 25" stroke="#FF8E3C" strokeWidth="3" fill="none" />
    <path d="M15 25 L15 40 L35 40 L35 25" stroke="#FF8E3C" strokeWidth="3" fill="#FFF" />
    <rect x="22" y="32" width="6" height="8" fill="#FF8E3C" />
  </svg>
);

// メインコンテンツコンポーネント
const MainContent = ({ searchTerm, setSearchTerm, activeTab, setActiveTab, applications, addComment, filteredApplications, getStatusStyle }) => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ 
      margin: 0,
      fontSize: '24px', 
      fontWeight: '500',
      color: '#FF8E3C',
      letterSpacing: '0.5px'
    }}>
      タテマエちゃんとホンネくん
    </h1>
    <p style={{
      margin: '5px 0 0 0',
      fontSize: '14px',
      color: '#666'
    }}>
      建築確認申請管理システム　〜効率的な申請管理をサポート〜
    </p>
    
    {/* 検索バー */}
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="🔍 案件を検索..."
      style={{
        width: '100%',
        padding: '15px 20px',
        border: '1px solid #FFB686',
        borderRadius: '8px',
        fontSize: '15px',
        marginBottom: '20px',
        backgroundColor: '#FFF',
        boxShadow: '0 2px 8px rgba(255, 142, 60, 0.05)',
        outline: 'none'
      }}
    />
    
    {/* タブ */}
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '30px',
      padding: '4px',
      backgroundColor: '#FFF',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(255, 142, 60, 0.05)'
    }}>
      {['all', '修正依頼中', '申請準備中', '審査中'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            padding: '12px 20px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === tab ? '#FFE5D6' : 'transparent',
            color: activeTab === tab ? '#FF8E3C' : '#666',
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
      gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
      gap: '20px' 
    }}>
      {filteredApplications.map(app => (
        <div
          key={app.id}
          style={{
            backgroundColor: '#FFF',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(255, 142, 60, 0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div>
              <h3 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '18px' }}>{app.projectName}</h3>
              <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>{app.location}</p>
            </div>
            <span style={{
              ...getStatusStyle(app.status),
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {app.status}
            </span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '15px',
            fontSize: '13px',
            color: '#666'
          }}>
            <span>ID: {app.id}</span>
            <span>提出日: {app.submitDate}</span>
            <span>更新: {app.lastUpdate}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px' 
          }}>
            <span style={{
              backgroundColor: app.urgency === '高' ? '#FFE5D6' : app.urgency === '中' ? '#FFF0D6' : '#E6F2EA',
              color: app.urgency === '高' ? '#D95E26' : app.urgency === '中' ? '#B87A2B' : '#2D5A27',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              緊急度: {app.urgency}
            </span>
            {app.revisions > 0 && (
              <span style={{
                backgroundColor: '#F5F5F5',
                color: '#666',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                修正回数: {app.revisions}
              </span>
            )}
          </div>
          
          {/* コメントセクション */}
          <div style={{ marginTop: '15px' }}>
            <h4 style={{ 
              margin: '0 0 10px 0', 
              color: '#333',
              fontSize: '14px',
              borderBottom: '1px solid #FFE5D6',
              paddingBottom: '5px'
            }}>
              コメント
            </h4>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {app.comments.map(comment => (
                <div 
                  key={comment.id}
                  style={{
                    backgroundColor: '#F9F9F9',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '5px'
                  }}>
                    <span>{comment.user}</span>
                    <span>{comment.date}</span>
                  </div>
                  <p style={{ margin: '0', fontSize: '13px', color: '#333' }}>
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 各ページコンポーネント
const GovernmentSurvey = () => (
  <div style={{ padding: '20px' }}>
    <h2>役所調査表/重要事項説明書</h2>
    {/* ここにコンテンツを追加 */}
  </div>
);

const BuildingConfirmation = () => (
  <div style={{ padding: '20px' }}>
    <h2>建築確認申請書</h2>
    {/* ここにコンテンツを追加 */}
  </div>
);

const PlanChange = () => (
  <div style={{ padding: '20px' }}>
    <h2>計画変更/着工時</h2>
    {/* ここにコンテンツを追加 */}
  </div>
);

const Others = () => (
  <div style={{ padding: '20px' }}>
    <h2>その他</h2>
    {/* ここにコンテンツを追加 */}
  </div>
);

// メインのアプリケーションコンポーネント
function App() {
  // 状態管理
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [applications, setApplications] = useState([
    {
      id: "APP-2024-001",
      projectName: "○○マンション新築工事",
      location: "東京都渋谷区○○",
      status: "修正依頼中",
      submitDate: "2024-02-15",
      lastUpdate: "2024-02-20",
      urgency: "高",
      revisions: 2,
      comments: [
        { id: 1, text: "構造計算書の確認が必要です", date: "2024-02-15", user: "田中" },
        { id: 2, text: "防火区画の見直しをお願いします", date: "2024-02-16", user: "鈴木" }
      ]
    },
    {
      id: "APP-2024-002",
      projectName: "△△ビル建替工事",
      location: "東京都新宿区△△",
      status: "申請準備中",
      submitDate: "2024-02-18",
      lastUpdate: "2024-02-18",
      urgency: "中",
      revisions: 0,
      comments: []
    },
    {
      id: "APP-2024-003",
      projectName: "□□住宅新築工事",
      location: "東京都目黒区□□",
      status: "審査中",
      submitDate: "2024-02-10",
      lastUpdate: "2024-02-19",
      urgency: "低",
      revisions: 1,
      comments: [
        { id: 3, text: "設備図の提出をお待ちしています", date: "2024-02-19", user: "山田" }
      ]
    }
  ]);

  // コメント追加関数
  const addComment = (appId, comment) => {
    setApplications(apps => apps.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          comments: [...(app.comments || []), {
            id: Date.now(),
            text: comment,
            date: new Date().toISOString().split('T')[0],
            user: "現在のユーザー"
          }]
        };
      }
      return app;
    }));
  };

  // 検索とフィルタリングの処理
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && app.status === activeTab;
  });

  // ステータス表示のスタイル
  const getStatusStyle = (status) => {
    switch (status) {
      case "修正依頼中":
        return { backgroundColor: '#FFE5D6', color: '#D95E26' };
      case "申請準備中":
        return { backgroundColor: '#FFF0D6', color: '#B87A2B' };
      case "審査中":
        return { backgroundColor: '#E6F2EA', color: '#2D5A27' };
      default:
        return { backgroundColor: '#F5F5F5', color: '#666666' };
    }
  };

  return (
    <Router>
      <div className="App" style={{ 
        display: 'flex',
        minHeight: '100vh',
        fontFamily: '"Noto Sans JP", sans-serif'
      }}>
        {/* 左側のナビゲーションメニュー */}
        <nav style={{
          width: '250px',
          backgroundColor: '#FFF',
          padding: '20px',
          borderRight: '1px solid #FFE5D6',
          boxShadow: '2px 0 10px rgba(255, 142, 60, 0.1)'
        }}>
          <Logo />
          <div style={{ marginTop: '30px' }}>
            <Link to="/" style={{
              display: 'block',
              padding: '12px 15px',
              margin: '8px 0',
              textDecoration: 'none',
              color: '#666',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}>
              案件一覧
            </Link>
            <Link to="/government-survey" style={{
              display: 'block',
              padding: '12px 15px',
              margin: '8px 0',
              textDecoration: 'none',
              color: '#666',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}>
              役所調査表/重要事項説明書
            </Link>
            <Link to="/building-confirmation" style={{
              display: 'block',
              padding: '12px 15px',
              margin: '8px 0',
              textDecoration: 'none',
              color: '#666',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}>
              建築確認申請書
            </Link>
            <Link to="/plan-change" style={{
              display: 'block',
              padding: '12px 15px',
              margin: '8px 0',
              textDecoration: 'none',
              color: '#666',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}>
              計画変更/着工時
            </Link>
            <Link to="/others" style={{
              display: 'block',
              padding: '12px 15px',
              margin: '8px 0',
              textDecoration: 'none',
              color: '#666',
              borderRadius: '8px',
              transition: 'all 0.3s ease'
            }}>
              その他
            </Link>
          </div>
        </nav>

        {/* メインコンテンツエリア */}
        <main style={{ 
          flex: 1,
          backgroundColor: '#FFF9F4'
        }}>
          <Routes>
            <Route path="/" element={<MainContent 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              applications={applications}
              addComment={addComment}
              filteredApplications={filteredApplications}
              getStatusStyle={getStatusStyle}
            />} />
            <Route path="/government-survey" element={<GovernmentSurvey />} />
            <Route path="/building-confirmation" element={<BuildingConfirmation />} />
            <Route path="/plan-change" element={<PlanChange />} />
            <Route path="/others" element={<Others />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
EOF
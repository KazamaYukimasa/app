import React, { useState } from 'react';
import './App.css';

// ロゴコンポーネント - より直線的なデザインに
const Logo = () => (
  <svg width="50" height="50" viewBox="0 0 50 50">
    <rect width="50" height="50" fill="#FFF9F4" rx="10" />
    <path d="M10 25 L25 10 L40 25" stroke="#FF8E3C" strokeWidth="3" fill="none" />
    <path d="M15 25 L15 40 L35 40 L35 25" stroke="#FF8E3C" strokeWidth="3" fill="#FFF" />
    <rect x="22" y="32" width="6" height="8" fill="#FF8E3C" />
  </svg>
);

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
    <div className="App" style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: '#FFF9F4',
      minHeight: '100vh',
      fontFamily: '"Noto Sans JP", sans-serif'
    }}>
      {/* ヘッダー */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#FFF',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(255, 142, 60, 0.1)'
      }}>
        <Logo />
        <div>
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
              padding: '20px',
              backgroundColor: '#FFF',
              borderRadius: '12px',
              boxShadow: '0 2px 10px rgba(255, 142, 60, 0.1)',
              transition: 'transform 0.2s ease',
              border: '1px solid #FFE5D6'
            }}
          >
            {/* 案件情報ヘッダー */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ 
                fontSize: '17px', 
                marginBottom: '8px',
                color: '#2D5A27',
                fontWeight: '500'
              }}>{app.projectName}</h3>
              <p style={{ 
                color: '#666', 
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                📍 {app.location}
              </p>
            </div>
            
            {/* ステータスと案件番号 */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px',
              fontSize: '14px'
            }}>
              <span style={{ color: '#666' }}>#{app.id}</span>
              <span
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '500',
                  ...getStatusStyle(app.status)
                }}
              >
                {app.status}
              </span>
            </div>

            {/* 案件詳細情報 */}
            <div style={{ 
              color: '#666', 
              fontSize: '13px',
              display: 'grid',
              gap: '8px',
              padding: '15px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              marginBottom: '15px'
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

            {/* コメントセクション */}
            <div style={{ 
              padding: '15px',
              backgroundColor: '#FAFAFA',
              borderRadius: '8px',
              marginBottom: '15px'
            }}>
              <h4 style={{ 
                margin: '0 0 10px 0',
                fontSize: '14px',
                color: '#2D5A27'
              }}>
                💭 コメント履歴
              </h4>
              
              {/* コメントリスト */}
              <div style={{ maxHeight: '150px', overflow: 'auto' }}>
                {app.comments && app.comments.map(comment => (
                  <div key={comment.id} style={{
                    padding: '8px',
                    borderBottom: '1px solid #FFE5D6',
                    fontSize: '13px'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: '#666'
                    }}>
                      <span style={{ color: '#FF8E3C' }}>{comment.user}</span>
                      <span>{comment.date}</span>
                    </div>
                    <p style={{ margin: '4px 0', color: '#333' }}>{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* コメント入力エリア */}
              <div style={{
                marginTop: '10px',
                display: 'flex',
                gap: '8px'
              }}>
                <input
                  type="text"
                  placeholder="コメントを入力..."
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #FFB686',
                    borderRadius: '6px',
                    fontSize: '13px'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      addComment(app.id, e.target.value.trim());
                      e.target.value = '';
                    }
                  }}
                />
                <button
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    backgroundColor: '#FF8E3C',
                    color: '#FFF',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                  onClick={(e) => {
                    const input = e.target.previousSibling;
                    if (input.value.trim()) {
                      addComment(app.id, input.value.trim());
                      input.value = '';
                    }
                  }}
                >
                  送信
                </button>
              </div>
            </div>

            {/* アクションボタン */}
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              justifyContent: 'flex-end' 
            }}>
              <button
                style={{
                  padding: '10px 20px',
                  border: '1px solid #FFB686',
                  borderRadius: '6px',
                  backgroundColor: '#FFF',
                  color: '#FF8E3C',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
              >
                詳細
              </button>
              <button
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  backgroundColor: '#FF8E3C',
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
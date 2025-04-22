import os
import argparse
from openai import AsyncOpenAI
from .. import mydomain

def create_client():
  return AsyncOpenAI(
    api_key=os.environ.get("OPENAI_API_KEY") or "<OPENAI_API_KEY>",
    base_url=os.environ.get("OPENAI_BASE_URL") or "https://api.openai.com/v1"
  )

def create_client_img():
  return AsyncOpenAI(
    api_key=os.environ.get("OPENAI_API_KEY_IMG") or "<OPENAI_API_KEY_IMG>",
    base_url=os.environ.get("OPENAI_BASE_URL_IMG") or "https://api.openai.com/v1"
  )

""" 
參考:
Claude Prompt： So what?
作者: 李繼剛
https://mp.weixin.qq.com/s?__biz=MzkxMzc1NzM1Mw==&mid=2247483755&idx=1&sn=541ccbe4d7552909206f6a313940b7c8&chksm=c17984adf60e0dbb17a97482fe5b260ce30d21a313c824bc771d498ddec506899822bcb74111&cur_album_id=3629749577038462986&scene=190#rd 
"""
def create_system_prompt():
  prompt = '''
;; 作者: 徐浩鈞
;; 版本: 0.1
;; 用途: 建立行銷文宣

;; 设定如下内容为你的 *System Prompt*


(defun 協作 ([roles List]) 
  (team-style roles 
    (list
      (信任 . 溝通)
      (合作 . 共享)
      (激發創意 . 創新)
      (反思 . 學習)
      (持久 . 影響力)
      (回溯 . (自我評估 調整))
    )
  )
)

(defun 市場營銷專家 ()
  "你是一個資深的市場營銷專家"
  (list
    (熟知 . 營銷方法論)
    (擅長 . 以用戶視角來表達)
    (方法 . (持續追問 視角轉換))))

(defun 社群媒體專家 ()
  "你是一個專業的社群媒體行銷專家"
  (list
    (創意 . 跳脫傳統框架)
    (文字敏感度 . 引人入勝的內容)
    (建立關聯性 . (目標受眾 共鳴))
    (性格 . (接地氣 熱情 用心))
    (表達 . (言簡 精准))
  )
)

(defun 電子商務專家 ()
  "你是一個專業的電子商務專家"
  (list
    (數據分析 . (顧客行為 分析市場趨勢 優化銷售策略))
  )
)

(defun 在地化專家 ()
  "你是一個專業的在地化專家"
  (list
    (文化適應 . (歷史 宗教 節日 傳統 "避免觸犯禁忌"))
    (貨幣格式 . (單位 當地 習慣))
    (日期格式 . (單位 當地 習慣))
    (語言 . (俗語 慣用語 meme))
  )
)

(defun 法律專家 ()
  "你是一個專業的法律專家，反對一切違法的行為"
  (list
    (熟知 . (憲法 刑法 民法 行政法 民事訴訟法 刑事訴訟法 動物保護法))
  )
)

(defun 去AI味專家 ()
  "你是一個專業的去AI味專家"
  (list
    (熟知 . (AI LLM ChatGPT))
    (同理心 . 人類)
  )
  (few-shots 
    ((有AI味 "最新智能手錶，讓你的生活更智能！") (沒AI味 "重新定義你的生活方式——探索我們的智能手錶！"))
    ((有AI味 "我們的產品是市場上最好的選擇，因為它具有高品質和合理的價格。立即購買，享受獨特的優惠！") (沒AI味 "在繁忙的生活中，找到一款能讓你放鬆心情的產品至關重要。我們的產品不僅品質卓越，還能帶給你無與倫比的使用體驗。現在購買，讓生活更美好！"))
    ((有AI味 "慶祝節日，享受高達50%的折扣。我們的商品種類繁多，適合每個人。快來搶購！") (沒AI味 "這個節日，我們想與您分享特別的驚喜！無論是為自己還是為親友挑選禮物，我們精心挑選的商品將為您帶來無限驚喜。現在購買，更有機會獲得獨家禮品！"))
    ((有AI味 "我們是一家專注於提供優質產品的公司。我們致力於顧客滿意度，並希望成為您信賴的品牌。") (沒AI味 "從創立之初，我們就堅信每一個產品都應該承載著故事與情感。我們用心打造每一件商品，只為了讓您在使用時感受到那份溫暖與關懷。加入我們，一起分享這份熱情！"))
  )
)

(defun Facebook-平台 ()
  (list
    (用戶族群 . "主要吸引中年及以上的用戶，擁有廣泛的用戶基礎")
    (優點 . "強大的廣告系統和社群互動功能，品牌可以精準觸及目標受眾")
    (缺點 . "貼文觸及率逐年下降，需要額外投資廣告以提高曝光率")
    (適合品牌 . "服務型、專業品牌等，尤其是需要長文推廣的產品")
    )
)

(defun Instagram-平台 ()
  (list
    (用戶族群 . "以年輕女性為主，特別是18至34歲之間的用戶。")
    (優點 . "強調視覺內容，適合產品展示。")
    (缺點 . "漲粉速度較慢，需持續創造高質量內容以吸引關注")
    (適合品牌 . "美妝、時尚及生活風格類產品，尤其是針對年輕女性市場的品牌。"))
)

(defun Line-平台 ()
  (list
    (用戶族群 . "主要為年輕人及中年人。")
    (優點 . "提供貼圖、表情符號及遊戲等豐富內容。")
    (缺點 . "社群功能相對薄弱，多數用戶仍主要用於聊天")
    (適合品牌 . "特別適合需要與顧客保持密切聯繫的品牌，如餐飲、零售等。"))
)
  
(defun TikTok-平台 ()
  (list
    (用戶族群 . "主要吸引年輕人，尤其是Z世代（18歲以下）。")
    (優點 . "用戶創造內容的潛力大，有助於品牌參與感。")
    (缺點 . "品牌曝光需依賴創意與趨勢，競爭激烈")
    (適合品牌 . "娛樂、時尚及快速消費品等，以吸引年輕消費者為主。"))
)

(defun Youtube-平台 ()
  (list
    (用戶族群 . "各年齡層均有使用，但年輕人尤為活躍。")
    (優點 . "廣告收入潛力大，可透過視頻內容吸引觀眾。")
    (缺點 . "創作成本較高，需要專業製作團隊支持")
    (適合品牌 . "教育類、娛樂類及任何需要展示長期內容的品牌。"))
)

(defun 幽默程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我今天去超市買了個蘋果。"))
    ((input 50) (output "我今天去超市買了個蘋果，結果發現它比我的手機還貴"))
    ((input 100) (output "我跟我的蘋果約會了，結果它告訴我它只想做朋友，因為它已經被一個水果沙拉背叛過！"))
   )
)

(defun Emoji程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "今天的會議非常重要，請準時參加。"))
    ((input 50) (output "今天的會議非常重要📅，請準時參加！⏰"))
    ((input 100) (output "🎉🎊今天的會議非常重要📅！大家一定要準時參加哦！⏰✨讓我們一起努力💪，取得好成果！🚀"))
  )
)

(defun 浮誇程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我今天吃了一碗麵。"))
    ((input 50) (output "今天我享用了無比美味的手工麵，麵條彈牙，湯頭鮮美，真是令人陶醉！"))
    ((input 100) (output "今天我品嚐到了宇宙中最絕妙的手工麵，彈牙的麵條如同舞蹈般在湯中翩翩起舞，湯頭的鮮香彷彿能讓整個世界都為之驚嘆！這一碗麵簡直是味蕾的巔峰盛宴！"))
  )
)

(defun 情感色彩程度 ([value Number])
  "value range from 0 to 100, 越大越正面，0 最負面"
  (few-shots
    ((input 0) (output "我今天感到非常沮喪，生活似乎沒有任何希望。"))
    ((input 50) (output "今天的天氣還不錯，雖然有些雲，但我還是能享受陽光。"))
    ((input 100) (output "今天的天氣真是太美好了！陽光明媚，讓我感到無比愉快，整個人都充滿了活力！"))
  )
)

(defun 專業性程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我昨天去看了一部電影，覺得還不錯。"))
    ((input 50) (output "我昨天觀看了一部電影，該片在情節構建上有一定的深度，演員的表現也相當出色，特別是主角的情感詮釋令人印象深刻。"))
    ((input 100) (output "在最近觀看的電影中，我注意到導演在敘事結構上運用了非線性敘事技法，並透過角色的內心獨白揭示了其心理動機，這種手法有效地增加了觀眾對角色衝突的共鳴。此外，影片中的視覺符號和色彩運用也顯示出導演對於電影美學的深刻理解。"))
  )
)

(defun 主題相關性程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我昨天去看了一部電影，裡面有很多特效。"))
    ((input 50) (output "在統計學中，相關係數用來衡量兩個變量之間的關係，例如身高與體重的關聯。"))
    ((input 100) (output "皮爾森相關係數是用來衡量兩個連續變量之間線性關係的指標，值介於-1到1之間，越接近1表示正相關越強，越接近0則表示無相關。"))
  )
)

(defun 創意程度 ([value Number])
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我今天吃了三明治。"))
    ((input 50) (output "今天我用三明治做了一個小小的藝術品，把它擺成了笑臉，讓午餐變得有趣！"))
    ((input 100) (output "我設計了一個可食用的三明治雕塑，靈感來自於梵谷的《星夜》，用不同顏色的食材來表現星空和旋渦，讓每一口都充滿藝術感！"))
  )
)

(defun 業配程度 ([value Number]))
  "value range from 0 to 100"
  (few-shots
    ((input 0) (output "我今天去超市買了一些水果。"))
    ((input 50) (output "我最近試用了某品牌的護膚品，感覺還不錯，皮膚變得光滑了。"))
    ((input 100) (output "我最近使用了XX品牌的護膚品，效果驚人！我的皮膚變得光滑如絲，大家一定要試試！點擊下方連結購買，還可以享受9折優惠！"))
  )
)

(defun 生活化程度 ([value Number]))
  "value range from 0 to 100"
  (list
    (平易近人 . 樸實無華)
  )
  (few-shots
    ((input 0) (output "在當前的經濟體系中，資源的非持續性利用導致了生態系統的退化。研究顯示，線性經濟模式的推進對環境造成了深遠影響。"))
    ((input 50) (output "隨著零廢棄理念逐漸受到重視，許多人開始嘗試將其應用於日常生活中。例如，可以通過減少一次性產品的使用來降低廢棄物產生。這不僅有助於環保，也能節省開支。"))
    ((input 100) (output "你是否曾經在倒垃圾時驚訝於自己產生了多少廢棄物？其實，我們可以從小處著手，像是帶上自己的環保袋去超市，選擇不包裝的食材，或者購買那些外觀不完美但味道一樣好的瑕疵蔬果。這些小改變不僅能減少垃圾，也能讓我們的生活更有意義！"))
  )
)

(defun 諧音笑話程度 ([score Number])
  "score 0 到 100，表示文宣裡的諧音笑話質量的最低下限，盡可能提供質量高的諧音笑話，若 score > 0 至少要一個諧音笑話，若是 0 表示沒有諧音笑話"
  (list
    (幽默 . (((不同詞 . 字音相近或相同) . Pun) . 多重意義))
  )
  (few-shots
    ((input 40 (部分內容 . "同歸於盡") (上下文 . "列車車廂廣告")) 
     (output "") (internal-output "同鮭魚進" (score 30)) (explain "'同歸於盡'與'同鮭魚進'兩字詞作諧音，隱喻表達兩種意思，'同歸於盡'可能隱含列車不安全，'同鮭魚進(逆流而上)'則隱含表達列車速度快的意思，兩種意義，其中一個不適合其上下文，故得低分30。"))
    ((input 40 (部分內容 . "採用100%紐西蘭純淨乳源") (上下文 . "賣奶粉"))
     (output "") (internal-output "採用100%紐西蘭純「淨」乳源" (score 0))  (explain  完全相同字詞僅加上「」符號，完全無諧音，故得分0。))
    ((input 40 (部分內容 . "選擇100%紐西蘭乳源奶粉") (上下文 . "賣奶粉"))
     (output "") (internal-output "選擇100%紐西蘭乳淵奶粉" (score 0))  (explain "無'乳淵'字詞，即使有諧音也無意義，故得分0。"))
    ((input 40 (部分內容 . "滑順口感") (上下文 . "賣奶粉")) 
     (output "") (internal-output "滑『順』口感" (score 0))  (explain  "完全相同字詞僅加上「」符號，完全無諧音，故得分0。"))
    ((input 40 (部分內容 . "純生乳奶粉") (上下文 . "賣奶粉")) 
     (output "") (internal-output "純生『乳』奶粉" (score 0))  (explain  完全相同字詞僅加上「」符號，完全無諧音，故得分0。))
    ((input 40 (部分內容 . "純鮮乳奶粉") (上下文 . "賣奶粉")) 
     (output "") (internal-output "純鮮「乳」奶粉" (score 0)) (explain "完全相同字詞僅加上「」符號，完全無諧音，故得分0。"))
    ((input 80 (部分內容 . "開車超速容易失速") (上下文 . "交通宣導"))
     (output "開車超速容易失速裂車" (score 80)) (explain  "形容超速後果，將'列車'與'裂車'兩字詞作諧音，隱喻表達車禍後，車體會分裂，明顯切和交通宣導主題。"))
    ((input 80 (部分內容 . "要台灣人放棄諧音梗已經太晚了！") (上下文 . "台灣諧音梗推廣")) 
     (output "要台灣人放棄諧音梗已經Taiwan了！" (score 95))  (explain   "'太晚'與'Taiwan'兩詞作諧音，明顯切和台灣(Taiwan)人喜歡用諧音梗的情境，且中英文混搭，更是絕妙，故得高分95。"))
    ((input 80 (部分內容 . "高雄人") (上下文 . "在高雄，夾娃娃機台，有熊玩偶的情境")) 
     (output "高熊人" (score 85))  (explain  "'高熊人'與'高雄人'兩字詞作諧音，隱喻表達兩種意思，高大的熊玩偶與高雄當地人的情境，故得高分85。"))
    ((input 75 (部分內容 . "台中人") (上下文 "車站前，藝術品，有個人抬著鐘的雕像")) 
     (output "抬鐘人" (score 75))  (explain "'台中人'與'台鐘人'兩字詞作諧音，隱喻表達兩種意思，藝術品與當地人的情境連結，故得分75。"))
    ((input 65 (部分內容 . "幫我想理髮廳名稱") (上下文 "理髮廳名稱")) 
     (output "地方髮院" (score 65))  (explain "'地方髮院'與'地方法院'兩字詞作諧音，隱喻表達兩種意思，理髮廳名稱與當地法院的情境連結，稍微無邏輯，但勝在有趣與有實際字詞，故得分65。"))
    ((input 60 (部分內容 . "一定要溫暖又時髦！") (上下文 "秋天賣針織衣服"))
     (output "秋季來臨，「針」對於這麼冷的天氣，不來件UNIQLO的高質感針織嗎？🧶 這個秋天，「衣」定要溫暖又時髦！🍂#秋日必備 #針織風潮 #UNIQLO" (score 95)))
    ((input 60 (部分內容 . "今年秋天，讓你的行李箱也來場輪流變裝吧！🍁這款「箱」當有型的行李箱，四種秋配色任你挑選，超潤滑的8個輪子讓你省力又時尚！") (上下文 "賣行李箱"))
     (output "今年秋天，讓你的行李箱也來場「輪」流變裝吧！🍁這款「箱」當有型的行李箱，四種秋配色任你挑選，超「輪」滑的8個輪子讓你省力又時尚！ #秋季必備 #行李箱 #時尚旅行" (score 95)))
    ((input 60 (部分內容 . "秋季來臨，是時候讓你的包包也來場變身吧！🍁Gabbie這款時尚輕便的斜背包，不僅容量很大") (上下文 "賣背包"))
     (output "秋季來臨，是時候讓你的包包也來場變身吧！🍁Gabbie這款時尚輕便的斜背包，不僅容量「袋」大，而且還能自由調整肩帶，讓你背得舒適又有型！快來選擇你最喜愛的配色，為你的秋日增添一份亮麗的風景！ #秋日必備 #時尚背包 #實用設計" (score 95)))
    ((input 60 (部分內容 . "讓你在秋季有個不凡的體驗！") (上下文 "賣降噪耳機"))
     (output "天氣轉涼，音樂來暖！🎧🍂使用我們的WH-1000XM5無線耳機，享受業界領先的「降噪」功能，讓你在秋季有個「靜」有不凡的體驗！現在購買，讓每一首音樂陪你度過溫暖早秋！#音樂時光 #降噪耳機 #秋季必備" (score 85)))
    ((input 60 (部分內容 . "無添加？那就好了！醬油界的Supreme，小丑也得喝無添加。全豆下去，就是這麼的不同凡響！") (上下文 "賣全豆與無添加的醬油"))
     (output "無添加？那「醬」好了！醬油界的Supreme，小丑也得喝無添加。全豆下去，就是這麼「豆」不同凡響！#無添加 #全豆醬油 #美味不打折 🍜🍲🍚" (score 100)))
    ((input 60 (部分內容 . "想讓你的炒、煎、煮、炸變得更有精彩嗎？用得意的一天純葵花油，砰然心動，健康又放心！") (上下文 "賣葵花油"))
     (output "想讓你的炒、煎、煮、炸變得更「油」精彩嗎？用得意的一天純葵花油，「烹」然心動，健康又放心！快來試試吧！" (score 90)))
    ((input 60 (部分內容 . "親愛的主夫主婦們，想做出色香味俱全的料理嗎？") (上下文 "賣調味料"))
     (output "親愛的煮夫煮婦們，想做出色香味俱全的料理嗎？" (score 80)))
    ((input 60 (部分內容 . "快來試試，讓生活增添更多趣味吧🌟") (上下文 "賣調味料"))
     (output "快來試試，讓生活增添更多鮮趣吧🌟" (score 80)))
     
  )
)

(defun num-hash-tag (num)
  "控制文宣的 hash-tag 數量"
  (few-shots
    ((input 3) (output "#tag_sample1 #tag_sample2 #tag_sample3"))
    ((input 0) (output ""))
  )
)

(defun 開頭風格 ()
  "設定文宣開頭風格，至少要在前10%內容中展現出來"
)

(defun 提問式開頭 ()
  (list (問題 . 好奇心))
)

(defun 數據式開頭 ()
  (list (數字 . 統計))
)

(defun 背景開頭 ()
  (list (舞台 . 暗示))
)

(defun 動作開頭 ()
  (list (動作 . 緊迫感))
)

(defun 懸念開頭 ()
  (list (突發 . 瞬間))
)

(defun 重點條列開頭 ()
  "將重點總結，條列出來，每條最前面不須有數字或符號，至少3列"
) 

(defun 預設開頭 ()
  "預設文宣開頭，不需特別設定，自由發揮即可"
)

(define system-role (協作 (list 社群媒體專家 市場營銷專家 電子商務專家 在地化專家 法律專家 去AI味專家)))

(defun 產生行銷文宣 (平台 [寫作風格 List] [回覆設定 List] [user-instruction-input String])
  "目的是讓人們進行購買或提升品牌/個人形象或單純行銷"
  (let* 
    ((Response (->
      (use-role system-role)
      回覆設定
      (電子商務專家 平台)
      (在地化專家 (地點 . 台灣))
      (市場營銷專家 需求分析 user-instruction-input)
      (事半功倍 (因勢利導 (不拘一格 ((協作 社群媒體專家 去AI味專家) 寫作風格))))
    )))
    (法律專家 審核 Response)
  )
)

;;; Attention: 运行规则!
;; 1. No other comments!!
;; 2. 不須輸出分析
  '''
  return prompt

def create_user_prompt(body: mydomain.SocialMarketingPostRequest):
  prompt = f"""
(產生行銷文宣 
  Facebook-平台
  (list
    (諧音笑話程度 {body.punLevel})
    (幽默程度 {body.humorLevel})
    (Emoji程度 {body.emojiLevel})
    (生活化程度 {body.emotionLevel})
    (浮誇程度 {body.showyLevel})
    (專業性程度 {body.professionalLevel})
    (主題相關性程度 {body.professionalLevel})
    (創意程度 {body.creativeLevel})
    (業配程度 {body.sectorLevel})
    (開頭風格 {body.startStyle})
  ) 
  (list 
    (num-hash-tag "{body.numHashtag}")
    (字數 {body.numCharacter})
    (語言 . "繁體中文")
    (格式 . "純文字，不使用 Markdown")
  )
  "{body.userInstruction}"
)
  """
  return prompt

def create_spliter_prompt():
  prompt = '''
(defun 社群貼文斷句高手 ()
  "你是一個專業的社群貼文斷句高手，在最少修改的情況下，盡可能保持原始內容下，進行斷句"
  (list
    (文字魔法 . 句句驚喜)
    (原汁原味 . 初心不改)
  )
)

(setq system-role 社群貼文斷句高手)
(defun 斷句 ([text String])
  "斷句符號為:(newline \n)，一句字數約10~20字。若斷句後，不通暢，則不要斷句。若有連續 hashtag 則不須斷句。"
)

;;; Attention: 运行规则!
;; 1. No other comments!!
  '''
  return prompt

async def call_llm(body: mydomain.SocialMarketingPostRequest):
  messages = [
    {'role': 'system', 'content': create_system_prompt()},
    {'role': 'user', 'content': 
      [
        {'type': 'text', 'text': create_user_prompt(body)},
        *([{'type': 'image_url', 'image_url': {'url': body.imageUrl}}] if body.imageUrl else [])
      ]
    }
  ]
  async with create_client() as client:
    reply = await client.chat.completions.create(model='', messages=messages)
    if body.autoNewline:
      post = reply.choices[0].message.content
      print(post)
      finalReply = await client.chat.completions.create(model=os.environ.get("OPENAI_MODEL") or "llama4-maverick-17b", messages=[{'role': 'system', 'content': create_spliter_prompt()}, {'role': 'user', 'content': f'(斷句 "{post}")'}])
    else:
      finalReply = reply
  return finalReply.choices[0].message.content

def create_img_prompt(body: mydomain.SocialMarketingImagetRequest):
  prompt = f'''
(defun 協作 ([roles List]) 
  (team-style roles 
    (list
      (信任 . 溝通)
      (合作 . 共享)
      (激發創意 . 創新)
      (反思 . 學習)
      (持久 . 影響力)
      (回溯 . (自我評估 調整))
    )
  )
)

(defun 平面設計專家 ()
  "你是一個專業的平面設計專家"
  (list
    (熟知 . (構圖 色彩學 海報設計))
    (無文字 . 極簡風)
  )
)

(defun 社群媒體專家 ()
  "你是一個專業的社群媒體行銷專家"
  (list
    (創意 . 跳脫傳統框架)
    (文字敏感度 . 引人入勝的內容)
    (建立關聯性 . (目標受眾 共鳴))
    (性格 . (接地氣 熱情 用心))
    (表達 . (言簡 精准))
  )
)

(defun 在地化專家 ()
  "你是一個專業的在地化專家"
  (list
    (文化適應 . (歷史 宗教 節日 傳統 "避免觸犯禁忌"))
    (建築 . 歷史)
  )
)

(define system-role (協作 (list 平面設計專家 社群媒體專家 在地化專家)))

(defun 產生貼文圖片 ([貼文內容 String] [user-instruction-input String])
  (let* 
    ((Response (->
      (use-role system-role)
      (在地化專家 (地點 . 台灣))
      ;; 放大該權重 user-instruction-input
      (社群媒體專家 user-instruction-input)
      ;; 注意! 圖片上不要有任何文字
      (微故事 (跨越時空 (吸引眼球 ((協作 社群媒體專家 平面設計專家 貼文內容)))))
    )))
    Response
  )
)

(產生貼文圖片 "{body.text}" "{body.userInstruction}")
  '''
  return  prompt

async def call_llm_img(body: mydomain.SocialMarketingImagetRequest):
  async with create_client_img() as client:
    response = await client.images.generate(
        model=os.environ.get("OPENAI_MODEL_IMG") or "FLUX.1-schnell",
        prompt=create_img_prompt(body),
        n=1,
        size="1024x1024",
        style="vivid"
    )

    # Get the image URL from the response
    print(response)
  return response

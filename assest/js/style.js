// ১. স্মার্ট ডাটাবেস
const travelData = {
    "সিলেট": [
        { 
            minBudget: 2000, maxBudget: 4500, 
            type: "Single Budget / Solo", 
            plan: `
                <b>✅ ১ দিন ১ রাত (বাজেট ট্যুর):</b><br>
                🚌 বাস ভাড়া: ৫০০-৬০০ টাকা (নন-এসি)<br>
                🚕 সিএনজি/লোকাল যাতায়াত: ৩০০-৪০০ টাকা (শেয়ারিং)<br>
                🏨 হোটেল: ৫০০-৮০০ টাকা (শেয়ারিং রুম)<br>
                🍲 খাবার: ৪০০-৫০০ টাকা<br>
                📍 স্পট: সাদা পাথর ও জাফলং।
            `
        },
        { 
            minBudget: 4501, maxBudget: 9000, 
            type: "Single Budget / Standard", 
            plan: `
                <b>✅ ২ দিন ১ রাত (স্ট্যান্ডার্ড):</b><br>
                🚌 বাস ভাড়া: ১০০০-১২০০ টাকা (এসি/নন-এসি)<br>
                🚕 সিএনজি রিজার্ভ: ১৫০০-২০০০ টাকা (৩-৪ জন মিলে)<br>
                🏨 হোটেল: ১৫০০-২০০০ টাকা (মাঝারি মান)<br>
                🍲 খাবার: ১০০০-১৫০০ টাকা<br>
                📍 স্পট: রাতারগুল, সাদা পাথর ও বিছানাকান্দি।
            `
        }
    ],
    "কক্সবাজার": [
        { 
            minBudget: 3000, maxBudget: 6500, 
            type: "Single Budget / Economy", 
            plan: `
                <b>✅ ২ দিন ১ রাত:</b><br>
                🚌 বাস ভাড়া: ৮০০-৯০০ টাকা (নন-এসি)<br>
                🛺 অটো/টমটম ভাড়া: ১০০-২০০ টাকা (প্রতিদিন)<br>
                🏨 হোটেল: ১০০০-১৫০০ টাকা (শেয়ারিং)<br>
                🍲 খাবার: ১০০০-১২০০ টাকা<br>
                📍 স্পট: মেইন বিচ, হিমছড়ি ও ইনানী।
            `
        }
    ],
    "সাজেক": [
        { 
            minBudget: 5000, maxBudget: 8500, 
            type: "Single Budget / Standard", 
            plan: `
                <b>✅ ২ দিন ১ রাত:</b><br>
                🚌 বাস ভাড়া: ৭০০-৮০০ টাকা (খাগড়াছড়ি পর্যন্ত)<br>
                🛻 চান্দের গাড়ি: ৮০০০-১০,০০০ টাকা (৮-১০ জন মিলে শেয়ারিং)<br>
                🏨 কটেজ: ২০০০-৪০০০ টাকা (পাহাড় ভিউ অনুযায়ী শেয়ারিং)<br>
                🍲 খাবার: ১২০০-১৫০০ টাকা<br>
                📍 স্পট: সাজেক ভ্যালি, হেলিপ্যাড ও কংলাক পাহাড়।
            `
        }
    ]
};

let isLoggedIn = false;

// ২. অ্যাপ শুরু করার ফাংশন (লগইন বাটন ক্লিক করলে)
function startApp() {
    isLoggedIn = true;
    document.getElementById('login-overlay').style.display = 'none';
    const authBtn = document.getElementById('auth-btn');
    if(authBtn) {
        authBtn.innerText = "Logout";
        authBtn.style.background = "rgba(231, 76, 60, 0.5)";
    }
    alert("সফলভাবে লগইন হয়েছে!");
    getUserLocation(); // প্রবেশের সাথে সাথে লোকেশন চাইবে
}

// ৩. লগআউট ফাংশন
function toggleAuth() {
    if (isLoggedIn) {
        isLoggedIn = false;
        location.reload(); // লগআউট করলে পেজ রিলোড হয়ে আবার লগইন স্ক্রিন আসবে
    }
}

// ৪. মূল ফাংশন (সেকশন দেখানো - এটি মাত্র একবারই থাকবে)
function showSection(type) {
    if (!isLoggedIn) {
        alert("দয়া করে আগে লগইন করুন!");
        return;
    }

    const infoBox = document.getElementById('info-display');
    const content = document.getElementById('content-area');
    infoBox.classList.add('active');

    if (type === 'planner') {
        content.innerHTML = `
            <h2 style="color: #2ecc71;">💰 বাজেট প্ল্যানার</h2>
            <div class="card">
                <input type="text" id="userPlace" placeholder="কোথায় যাবেন? (সিলেট, কক্সবাজার)" class="ai-input">
                <input type="number" id="userBudget" placeholder="বাজেট কত?" class="ai-input">
                <button onclick="generateAIPlan()" class="ai-btn">প্ল্যান তৈরি করো ✨</button>
            </div>
            <div id="ai-result"></div>
        `;
    } else if (type === 'places') {
        content.innerHTML = `
            <h2 style="color: #2ecc71; margin-bottom: 20px;">🏔️ বর্তমানের সেরা জায়গা</h2>
            
            <h3 style="margin: 20px 0 10px; color: #333; border-left: 4px solid #2ecc71; padding-left: 10px;">📍 সিলেট</h3>
            <div class="card"><h4>১. সাদা পাথর, ভোলাগঞ্জ</h4><p>স্বচ্ছ জল আর সাদা পাথরের বিছানা।</p></div>
            <div class="card"><h4>২. রাতারগুল জলাবন</h4><p>বাংলার আমাজন নামে পরিচিত।</p></div>
            <div class="card"><h4>৩. বিছানাকান্দি</h4><p>স্বচ্ছ পানির ধারা ও পাথরের স্তূপের জন্য পরিচিত।</p></div>

            <h3 style="margin: 30px 0 10px; color: #333; border-left: 4px solid #3498db; padding-left: 10px;">📍 কক্সবাজার</h3>
            <div class="card"><h4>১. মেরিন ড্রাইভ</h4><p>একপাশে পাহাড় আর অন্যপাশে সমুদ্রের মনোমুগ্ধকর দৃশ্য।</p></div>
            <div class="card"><h4>২. সেন্ট মার্টিন</h4><p>নীল পানির একমাত্র প্রবাল দ্বীপ।</p></div>

            <h3 style="margin: 30px 0 10px; color: #333; border-left: 4px solid #f1c40f; padding-left: 10px;">📍 ঢাকা</h3>
            <div class="card"><h4>১. আহসান মঞ্জিল</h4><p>বুড়িগঙ্গা নদীর তীরে ঐতিহাসিক নওয়াব প্যালেস।</p></div>
            <div class="card"><h4>২. পানাম সিটি</h4><p>সোনারগাঁও এর প্রাচীন ঐতিহাসিক শহর।</p></div>
        `;
    } else if (type === 'guide') {
        content.innerHTML = `
            <h2 style="color: #2ecc71; margin-bottom: 20px;">📞 ট্রান্সপোর্ট, হোটেল ও গাইড </h2>
            
            <div class="city-guide" style="margin-bottom: 35px; border: 1px solid #ddd; padding: 15px; border-radius: 15px;">
                <h3 style="color: #2ecc71; border-bottom: 2px solid #2ecc71; padding-bottom: 5px; margin-bottom: 15px;">📍 সিলেট (Sylhet)</h3>
                
                <div class="card" style="border-left-color: #3498db;">
                    <h4>🚌 বাস ও যাতায়াত</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span><strong>এনা ট্রান্সপোর্ট</strong></span>
                        <div>
                            <a href="tel:017XXXXXXXX" style="background: #2ecc71; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 12px; margin-right: 5px;">📞 Call</a>
                            <a href="#" target="_blank" style="background: #3b5998; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 12px;">FB Page</a>
                        </div>
                    </div>
                </div>

                <div class="card" style="background: #f0fff4; border-left-color: #27ae60;">
                    <h4>👨‍ লোকাল গাইড (Trusted)</h4>
                    <p>নাম: করিম ভাই (সিলেট এক্সপার্ট)</p>
                    <a href="tel:017XXXXXXXX" style="display: inline-block; margin-top: 10px; background: #27ae60; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">সরাসরি কল দিন 📞</a>
                </div>
            </div>

            <div class="city-guide" style="margin-bottom: 35px; border: 1px solid #ddd; padding: 15px; border-radius: 15px;">
                <h3 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px; margin-bottom: 15px;">📍 কক্সবাজার (Cox's Bazar)</h3>
                
                <div class="card" style="border-left-color: #3498db;">
                    <h4>🚌 বাস ও যাতায়াত</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                        <span><strong>শ্যামলী NR</strong></span>
                        <div>
                            <a href="tel:018XXXXXXXX" style="background: #2ecc71; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 12px; margin-right: 5px;">📞 Call</a>
                            <a href="#" target="_blank" style="background: #3b5998; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 12px;">FB Page</a>
                        </div>
                    </div>
                </div>

                <div class="card" style="background: #f0f7ff; border-left-color: #2980b9;">
                    <h4>👨‍ লোকাল গাইড (Trusted)</h4>
                    <p>নাম: জহির আহমেদ</p>
                    <a href="tel:018XXXXXXXX" style="display: inline-block; margin-top: 10px; background: #2980b9; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-weight: bold;">সরাসরি কল দিন 📞</a>
                </div>
            </div>

            <div class="card" style="background: #fff5f5; border: 1px dashed #e74c3c;">
                <h4 style="color: #e74c3c;">🆘 জরুরি সেবা</h4>
                <a href="tel:999" style="text-decoration: none; color: #e74c3c; font-size: 20px; font-weight: bold;">৯৯৯ (কল করতে টাচ করুন)</a>
            </div>
        `;
    }
}

// ৫. এআই প্ল্যান জেনারেটর
function generateAIPlan() {
    const placeInput = document.getElementById('userPlace').value.trim();
    const budget = parseInt(document.getElementById('userBudget').value);
    const resultDiv = document.getElementById('ai-result');

    if (!placeInput || !budget) {
        alert("তথ্য সঠিকভাবে দিন!");
        return;
    }

    let foundPlans = travelData[placeInput];
    if (foundPlans) {
        let matched = foundPlans.find(p => budget >= p.minBudget && budget <= p.maxBudget);
        if (matched) {
            resultDiv.innerHTML = `<div class="card"><h4>${matched.type} Plan</h4><p>${matched.plan}</p></div>`;
        } else {
            resultDiv.innerHTML = `<div class="card"><p>এই বাজেটে কোনো প্ল্যান নেই।</p></div>`;
        }
    } else {
        resultDiv.innerHTML = `<div class="card"><p>তথ্য পাওয়া যায়নি।</p></div>`;
    }
}

function hideSection() {
    document.getElementById('info-display').classList.remove('active');
}

// ৬. লোকেশন সার্ভিস
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log("Location obtained");
        }, (err) => {
            console.error("Location denied");
        });
    }
}

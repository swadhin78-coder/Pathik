// ১. স্মার্ট ডাটাবেস
const travelData = {
    "সিলেট": [
        { 
            minBudget: 2000, maxBudget: 4500, 
            type: "Single Budget / Solo", 
            plan: `<b>✅ ১ দিন ১ রাত (বাজেট ট্যুর):</b><br>🚌 বাস ভাড়া: ৫০০-৬০০ টাকা (নন-এসি)<br>🚕 যাতায়াত: ৩০০-৪০০ টাকা<br>🏨 হোটেল: ৫০০-৮০০ টাকা<br>🍲 খাবার: ৪০০-৫০০ টাকা<br>📍 স্পট: সাদা পাথর ও জাফলং।`
        },
        { 
            minBudget: 4501, maxBudget: 9000, 
            type: "Single Budget / Standard", 
            plan: `<b>✅ ২ দিন ১ রাত (স্ট্যান্ডার্ড):</b><br>🚌 বাস ভাড়া: ১০০০-১২০০ টাকা<br>🚕 সিএনজি রিজার্ভ: ১৫০০-২০০০ টাকা<br>🏨 হোটেল: ১৫০০-২০০০ টাকা<br>🍲 খাবার: ১০০০-১৫০০ টাকা<br>📍 স্পট: রাতারগুল ও বিছানাকান্দি।`
        }
    ],
    "কক্সবাজার": [
        { 
            minBudget: 3000, maxBudget: 6500, 
            type: "Single Budget / Economy", 
            plan: `<b>✅ ২ দিন ১ রাত:</b><br>🚌 বাস ভাড়া: ৮০০-৯০০ টাকা<br>🛺 অটো ভাড়া: ১০০-২০০ টাকা<br>🏨 হোটেল: ১০০০-১৫০০ টাকা<br>🍲 খাবার: ১০০০-১২০০ টাকা<br>📍 স্পট: মেইন বিচ ও ইনানী।`
        }
    ],
    "সাজেক": [
        { 
            minBudget: 5000, maxBudget: 8500, 
            type: "Single Budget / Standard", 
            plan: `<b>✅ ২ দিন ১ রাত:</b><br>🚌 বাস ভাড়া: ৭০০-৮০০ টাকা<br>🛻 চান্দের গাড়ি: ৮০০০-১০,০০০ (শেয়ারিং)<br>🏨 কটেজ: ২০০০-৪০০০ টাকা<br>🍲 খাবার: ১২০০-১৫০০ টাকা<br>📍 স্পট: সাজেক ভ্যালি ও কংলাক পাহাড়।`
        }
    ]
};

// ২. অথেন্টিকেশন লজিক
let isLoggedIn = false;

function toggleAuth() {
    const authBtn = document.getElementById('auth-btn');
    
    if (!isLoggedIn) {
        isLoggedIn = true;
        authBtn.innerText = "Logout";
        authBtn.style.background = "rgba(231, 76, 60, 0.5)";
        alert("সফলভাবে লগইন হয়েছে!");
        getUserLocation(); // লগইন করলেই লোকেশন চাইবে
    } else {
        isLoggedIn = false;
        authBtn.innerText = "Login";
        authBtn.style.background = "rgba(255, 255, 255, 0.2)";
        alert("লগআউট হয়েছে!");
        hideSection();
    }
}

// ৩. মূল ফাংশন (সেকশন দেখানোর জন্য - একটিই ফাংশন থাকবে)
function showSection(type) {
    if (!isLoggedIn) {
        alert("দয়া করে আগে লগইন করুন!");
        return;
    }

    const infoBox = document.getElementById('info-display');
    const content = document.getElementById('content-area');
    infoBox.classList.add('active');

    if (type === 'planner') {
        content.innerHTML = `
            <h2 style="color: #2ecc71;">💰 বাজেট প্ল্যানার</h2>
            <div class="card">
                <input type="text" id="userPlace" placeholder="কোথায় যেতে চান? (সিলেট, সাজেক)" class="ai-input">
                <input type="number" id="userBudget" placeholder="বাজেট কত? (টাকা)" class="ai-input">
                <button onclick="generateAIPlan()" class="ai-btn">প্ল্যান তৈরি করো ✨</button>
            </div>
            <div id="ai-result"></div>
        `;
    } else if (type === 'places') {
        content.innerHTML = `
            <h2 style="color: #2ecc71; margin-bottom: 20px;">🏔️ বর্তমানের সেরা জায়গা</h2>
            <h3 style="color: #333; border-left: 4px solid #2ecc71; padding-left: 10px;">📍 সিলেট</h3>
            <div class="card"><h4>সাদা পাথর, ভোলাগঞ্জ</h4><p>স্বচ্ছ জল আর সাদা পাথরের বিছানা।</p></div>
            <h3 style="margin-top:20px; color: #333; border-left: 4px solid #3498db; padding-left: 10px;">📍 কক্সবাজার</h3>
            <div class="card"><h4>মেরিন ড্রাইভ</h4><p>একপাশে পাহাড় আর অন্যপাশে সমুদ্র।</p></div>
        `;
    } else if (type === 'guide') {
        content.innerHTML = `
            <h2 style="color: #2ecc71; margin-bottom: 20px;">📞 ট্রান্সপোর্ট ও গাইড</h2>
            <div class="city-guide" style="border: 1px solid #ddd; padding: 15px; border-radius: 15px;">
                <h3 style="color: #2ecc71;">📍 সিলেট</h3>
                <div class="card">
                    <span><strong>এনা ট্রান্সপোর্ট</strong></span><br>
                    <a href="tel:01700000000" style="background: #2ecc71; color: white; padding: 5px 10px; border-radius: 5px; text-decoration: none; font-size: 12px; display:inline-block; margin-top:5px;">📞 Call Now</a>
                </div>
            </div>
        `;
    }
}

// ৪. এআই প্ল্যান তৈরি
function generateAIPlan() {
    const placeInput = document.getElementById('userPlace').value.trim();
    const budget = parseInt(document.getElementById('userBudget').value);
    const resultDiv = document.getElementById('ai-result');

    if (!placeInput || !budget) {
        alert("দয়া করে জায়গা এবং বাজেট সঠিকভাবে লিখুন!");
        return;
    }

    resultDiv.innerHTML = "<p style='text-align:center;'>হিসাব হচ্ছে...</p>";

    setTimeout(() => {
        let foundPlans = travelData[placeInput];
        if (foundPlans) {
            let matchedPlan = foundPlans.find(p => budget >= p.minBudget && budget <= p.maxBudget);
            if (matchedPlan) {
                resultDiv.innerHTML = `
                    <div class="card" style="border: 2px solid #2ecc71; background: #f9fffb;">
                        <h4 style="color:#2ecc71">✅ পথিক সাজেস্ট করছে (${matchedPlan.type})</h4>
                        <p style="margin-top:10px;">${matchedPlan.plan}</p>
                    </div>`;
            } else {
                resultDiv.innerHTML = `<div class="card"><p>এই বাজেটে কোনো প্ল্যান নেই।</p></div>`;
            }
        } else {
            resultDiv.innerHTML = `<div class="card"><p>তথ্য পাওয়া যায়নি। সিলেট, কক্সবাজার বা সাজেক লিখুন।</p></div>`;
        }
    }, 1000);
}

// ৫. লোকেশন ও ইউটিলিটি
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log("Location found:", pos.coords.latitude);
        }, (err) => {
            console.error("Location error:", err.message);
        });
    }
}

function hideSection() {
    document.getElementById('info-display').classList.remove('active');
}

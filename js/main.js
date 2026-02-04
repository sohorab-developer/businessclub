document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const toggleChatbot = document.getElementById('toggle-chatbot');
    const closeChatbot = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickQuestionBtns = document.querySelectorAll('.quick-question-btn');


    toggleChatbot.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });

    closeChatbot.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });


    const knowledgeBase = {
        'event-types': {
            question: 'What types of events do you organize?',
            answer: 'We specialize in organizing a wide range of events including corporate conferences, product launches, weddings, galas, and private parties. Our team can handle events from 50 to 5,000 attendees with full-service planning and execution.'
        },
        'pricing': {
            question: 'What are your pricing options?',
            answer: 'Our pricing depends on the event type, size, and services required. We offer three main packages: Basic (starting at $5,000), Premium (starting at $15,000), and Platinum (custom pricing). All packages include event planning, venue coordination, and basic decor.'
        },
        'availability': {
            question: 'How do I check date availability?',
            answer: 'You can check date availability by contacting our event coordinators at events@yourcompany.com or calling (555) 123-4567. For quicker response, please provide your preferred date(s), event type, and estimated number of guests.'
        },
        'catering': {
            question: 'Do you provide catering services?',
            answer: 'Yes, we partner with top-rated catering services and can arrange everything from cocktail receptions to formal sit-down dinners. We accommodate all dietary restrictions and can customize menus to fit your event theme and budget.'
        },
        'contact': {
            question: 'How can I contact your team?',
            answer: 'You can reach our event specialists by phone at (555) 123-4567, by email at info@yourcompany.com, or through our contact form on the website. Our office hours are Monday-Friday, 9am-6pm. For urgent inquiries outside these hours, please use our 24/7 event emergency line.'
        },
        'default': {
            question: '',
            answer: "I'm sorry, I didn't understand your question. Could you please rephrase it or select one of the suggested questions above?"
        }
    };


    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'chatbot-user' : 'chatbot-response'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        chatbotMessages.appendChild(messageDiv);
        

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }


    function processUserInput(input) {
        addMessage(input, true);
                let response = knowledgeBase.default;
        const inputLower = input.toLowerCase();
        
        for (const key in knowledgeBase) {
            if (key !== 'default' && inputLower.includes(key) || 
                inputLower.includes(knowledgeBase[key].question.toLowerCase())) {
                response = knowledgeBase[key];
                break;
            }
        }
        
        setTimeout(() => {
            addMessage(response.answer);
                        if (response === knowledgeBase.default) {
                showQuickQuestions();
            }
        }, 800);
    }

    function showQuickQuestions() {
        setTimeout(() => {
            const quickQuestionsDiv = document.createElement('div');
            quickQuestionsDiv.className = 'quick-questions';
            
            for (const key in knowledgeBase) {
                if (key !== 'default') {
                    const button = document.createElement('button');
                    button.className = 'quick-question-btn';
                    button.dataset.question = key;
                    button.textContent = knowledgeBase[key].question;
                    button.addEventListener('click', handleQuickQuestion);
                    quickQuestionsDiv.appendChild(button);
                }
            }
            
            chatbotMessages.appendChild(quickQuestionsDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 500);
    }


    function handleQuickQuestion(e) {
        const questionKey = e.target.dataset.question;
        const question = knowledgeBase[questionKey].question;
                const quickQuestions = document.querySelectorAll('.quick-questions');
        quickQuestions.forEach(q => q.remove());
        
        processUserInput(question);
    }

    quickQuestionBtns.forEach(btn => {
        btn.addEventListener('click', handleQuickQuestion);
    });

    sendButton.addEventListener('click', function() {
        const input = userInput.value.trim();
        if (input) {
            processUserInput(input);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const input = userInput.value.trim();
            if (input) {
                processUserInput(input);
                userInput.value = '';
            }
        }
    });
});
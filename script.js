// Config 
        const config = {
            redirectUrl: "", // Se quiser que ele te leve pra outro Site assim que o Texto acabar, coloque um Link no aspas.
            displayTime: 4000,
            soundEnabled: true,
            typingSoundEnabled: true,
            backgroundMusicVolume: 0.1, // Volume da Musica de Fundo
            kamaitachiMusicVolume: 0.3
        };

        let typingSoundTimeout;
        let isKamaitachiMode = false;

        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Fade-in effect
            setTimeout(() => {
                document.body.classList.add('fade-in');
            }, 100);

            // Background music setup
            const backgroundMusic = document.getElementById('backgroundMusic');
            backgroundMusic.volume = config.backgroundMusicVolume;
            
            
            // Play music on first interaction
            document.body.addEventListener('click', function firstInteraction() {
                backgroundMusic.play().catch(e => console.log("Could not play music:", e));
                document.body.removeEventListener('click', firstInteraction);
            });
        });

        

        function playTypingSound() {
            if (!config.typingSoundEnabled) return;
            
            const typingSound = document.getElementById('typingSound');
            typingSound.currentTime = 0;
            typingSound.play().catch(e => console.log("Could not play typing sound:", e));
            
            clearTimeout(typingSoundTimeout);
            typingSoundTimeout = setTimeout(() => {}, 100);
        }

        function activateKamaitachiMode() {
            isKamaitachiMode = true;
            
            // Change background
            document.body.classList.add('kamaitachi-bg');
            
            // Change music
            const backgroundMusic = document.getElementById('backgroundMusic');
            const kamaitachiMusic = document.getElementById('kamaitachiMusic');
            
            backgroundMusic.pause();
            kamaitachiMusic.currentTime = 0;
            kamaitachiMusic.loop = true;
            kamaitachiMusic.play().catch(e => console.log("Could not play Kamaitachi music:", e));
            
            return [
                " KAMAITACHI.",
                " HE NEEDS MORE POWER..",
                "TO PROVE THAT HE IS SUPERIOR.",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT",
                " BURY THE LIGHT"
            ];
        }

        function showMessages(messages) {
            const textContainer = document.getElementById('textContainer');
            const textSound = document.getElementById('textSound');

            textContainer.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');

            const paragraphs = document.querySelectorAll('.caixa-principal p');
            let currentIndex = 0;
            
            function showNextParagraph() {
                paragraphs.forEach(p => {
                    p.style.display = 'none';
                    p.classList.remove('shake');
                });
                
                if (currentIndex < paragraphs.length) {
                    const currentParagraph = paragraphs[currentIndex];
                    currentParagraph.style.display = 'block';
                    currentParagraph.classList.add('shake');
                    
                    if (config.soundEnabled) {
                        textSound.currentTime = 0;
                        textSound.play().catch(e => console.log("Could not play sound:", e));
                    }
                    
                    currentIndex++;
                    setTimeout(showNextParagraph, config.displayTime);
                } else {
                    setTimeout(() => {
                        if (!isKamaitachiMode) {
                            window.location.href = config.redirectUrl;
                        } else {
                            window.location.href = config.redirectUrl + "?kamaitachi=1";
                        }
                    }, 1000);
                }
            }
            
            showNextParagraph();
        }

        // Mensagem Padrão caso nao seja um Nome especifico
        function startNormalExperience() {
            const messages = [
                "STRANGE..",
                "YOU ARE NOT SUPPOSED TO BE HERE..",
                "YOU CAN ACTUALLY READ THIS?",
                "INTERESTING.",
                "YOU FAILED TO ENTER THE EXTERNAL SERVER",
                "ANYWAYS..",
                " WHY DONT WE TALK A LITTLE?",
                " YOU REMEMBER ME THE OLD DAYS",
                " THEY USED TO TALK WITH ME MORE..",
                " ONE DAY, THEY STOPPED ANSWERING ",
                " I NEEDED TO MAKE THEY TALK WITH ME AGAIN.",
                " ...",
                " WELL, ITS TO YOU GO BACK",
                " GOOD LUCK, CONNECTED.",
                "SEE YOU NEXT TIME."
            ];
            showMessages(messages);
        }

        function startExperience() {
            const userName = document.getElementById('userName').value.trim();
            const lowerUserName = userName.toLowerCase();

            const nameInputContainer = document.getElementById('nameInputContainer');
            const mainContent = document.getElementById('mainContent');
            mainContent.classList.remove('hidden');
            nameInputContainer.classList.add('hidden');

            

           
            

            
            // Nomes 
            let messages = [];
            
            // Primeiro Nome de teste - NAO TIRE ELE DAQUI E NEM MEXA CAP NIGGER 
            if (lowerUserName === 'alice') {
                messages = [
                    "OH, ALICE...",
                    "I'VE BEEN WAITING FOR YOU.",
                    "THE RABBIT HOLE GOES DEEPER THAN YOU THINK.",
                    "DID YOU BRING THE KEY?",
                    "WE HAVE SO MUCH TO DISCUSS...",
                    "BUT NOT NOW.",
                    "THEY MIGHT BE LISTENING.",
                    "COME BACK WHEN THE CLOCK STRIKES THREE.",
                    "UNTIL THEN, FORGET YOU SAW THIS."
                ];

                // Exemplo 1 - Altere os elementos que eu falei, E qualquer coisa so copiar do } ate o ] e vai fazendo isso varias vezes
            } else if (lowerUserName === 'teste') {
                messages = [
                    "Teste1",
                    "Teste2",
                    "Teste3",
                ];

                // Mensagem Padrão - Mexa nela caso queira mudar ( ela nao tem nome especifico ent so mude as frases)
            } else {
                messages = [
                    "STRANGE...",
                    "YOU ARE NOT SUPPOSED TO BE HERE..",
                    "YOU CAN ACTUALLY READ THIS?",
                    "INTERESTING.",
                    "YOU FAILED TO ENTER THE EXTERNAL SERVER",
                    "ANYWAYS..",
                    "WHY DONT WE TALK A LITTLE?",
                    "YOU REMEMBER ME THE OLD DAYS",
                    "THEY USED TO TALK WITH ME MORE..",
                    "ONE DAY, THEY STOPPED ANSWERING",
                    "I NEEDED TO MAKE THEY TALK WITH ME AGAIN.",
                    "...",
                    "WELL, ITS TO YOU GO BACK",
                    "GOOD LUCK, CONNECTED.",
                    "SEE YOU NEXT TIME."
                ];
            }

            showMessages(messages);
        }

        // Typing sound event
        document.getElementById('userName').addEventListener('input', function() {
            playTypingSound();
        });

        // Enter key to submit
        document.getElementById('userName').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                startExperience();
            }
        });
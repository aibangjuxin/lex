document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('protocol-grid');
    const comparisonArea = document.getElementById('comparison-area');
    const comparisonContent = document.getElementById('comparison-content');
    const clearBtn = document.getElementById('clear-comparison');
    
    let selectedProtocols = [];

    // Render Cards
    protocols.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = p.id;
        card.onclick = () => toggleSelection(p.id);

        card.innerHTML = `
            <div class="select-overlay"></div>
            <div class="card-header">
                <div class="card-title">${p.name}</div>
                <div class="card-badge">${p.type}</div>
            </div>
            <div class="card-meta">
                <div class="meta-item">📅 ${p.year}</div>
                <div class="meta-item">🚀 ${p.speed} Speed</div>
            </div>
            <div class="card-desc">${p.description}</div>
            <div class="tags">
                ${p.pros.slice(0, 2).map(pro => `<span class="tag pro">✓ ${pro}</span>`).join('')}
                ${p.cons.slice(0, 1).map(con => `<span class="tag con">✗ ${con}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });

    clearBtn.onclick = () => {
        selectedProtocols = [];
        updateUI();
    };

    function toggleSelection(id) {
        const index = selectedProtocols.indexOf(id);
        if (index > -1) {
            // Deselect
            selectedProtocols.splice(index, 1);
        } else {
            // Select
            if (selectedProtocols.length >= 2) {
                // Remove the first one if we already have 2
                selectedProtocols.shift();
            }
            selectedProtocols.push(id);
        }
        updateUI();
    }

    function updateUI() {
        // Update cards visual state
        document.querySelectorAll('.card').forEach(card => {
            if (selectedProtocols.includes(card.dataset.id)) {
                card.classList.add('selected');
            } else {
                card.classList.remove('selected');
            }
        });

        // Update Comparison Area
        if (selectedProtocols.length === 2) {
            renderComparison();
            comparisonArea.classList.add('active');
        } else {
            comparisonArea.classList.remove('active');
        }
    }

    function renderComparison() {
        const p1 = protocols.find(p => p.id === selectedProtocols[0]);
        const p2 = protocols.find(p => p.id === selectedProtocols[1]);

        const html = `
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        <th>${p1.name}</th>
                        <th>${p2.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Protocol Type</strong></td>
                        <td>${p1.type}</td>
                        <td>${p2.type}</td>
                    </tr>
                    <tr>
                        <td><strong>Transport</strong></td>
                        <td>${p1.transport}</td>
                        <td>${p2.transport}</td>
                    </tr>
                    <tr>
                        <td><strong>Obfuscation</strong></td>
                        <td>${p1.obfuscation}</td>
                        <td>${p2.obfuscation}</td>
                    </tr>
                    <tr>
                        <td><strong>Best For</strong></td>
                        <td>${p1.bestFor}</td>
                        <td>${p2.bestFor}</td>
                    </tr>
                    <tr>
                        <td><strong>Pros</strong></td>
                        <td>
                            <ul style="padding-left: 20px; margin: 0;">
                                ${p1.pros.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </td>
                        <td>
                            <ul style="padding-left: 20px; margin: 0;">
                                ${p2.pros.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td><strong>Cons</strong></td>
                        <td>
                            <ul style="padding-left: 20px; margin: 0;">
                                ${p1.cons.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </td>
                        <td>
                            <ul style="padding-left: 20px; margin: 0;">
                                ${p2.cons.map(i => `<li>${i}</li>`).join('')}
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        comparisonContent.innerHTML = html;
    }
});

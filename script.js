const body=document.body;
const themeBtn=document.getElementById('themeBtn');
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
const progress=document.getElementById('progress');

themeBtn.addEventListener('click',()=>{
  body.classList.toggle('dark');
  themeBtn.textContent=body.classList.contains('dark')?'☀':'☾';
});

menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

window.addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const modal=document.getElementById('modal');
const modalContent=document.getElementById('modalContent');
const projects={
 project1:{title:'Scalable Web Application Deployment',body:`<p>Deployed a highly available web application using AWS and Linux.</p><ul><li>Deployed Ubuntu-based EC2 instances and configured Apache Web Server.</li><li>Implemented Auto Scaling Groups to handle dynamic traffic loads.</li><li>Configured an Application Load Balancer for high availability.</li><li>Monitored system performance using Amazon CloudWatch.</li><li>Designed the architecture for improved uptime and fault tolerance.</li></ul>`},
 project2:{title:'Automated Server Backup System',body:`<p>Designed an automated solution to securely back up server data with minimal manual intervention.</p><ul><li>Compressed server data and uploaded backups to Amazon S3.</li><li>Used Shell scripts to automate backup and restore processes.</li><li>Configured AWS IAM and AWS CLI for secure authentication and transfer.</li><li>Scheduled regular backups using Cron jobs on Ubuntu Linux.</li><li>Focused on data safety, disaster recovery and reliable storage.</li></ul>`}
};
document.querySelectorAll('.project-card').forEach(card=>{
 card.addEventListener('click',e=>{
   const key=card.dataset.modal, p=projects[key];
   modalContent.innerHTML=`<span class="mono accent">PROJECT</span><h2>${p.title}</h2>${p.body}`;
   modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
 });
});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
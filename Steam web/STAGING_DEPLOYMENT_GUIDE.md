# 🚀 **STAGING DEPLOYMENT GUIDE - STEAMPHONY**

**Technical Specification**: #001  
**Assigned by**: Web Development Lead  
**Implementation by**: [DevOps Engineer]  
**Deadline**: EOD Today  
**Estimated time**: 2-3 hours

---

## 🎯 **ACCEPTANCE CRITERIA CHECKLIST**

### ✅ **MUST HAVE (Required for completion)**
- [ ] Working staging URL accessible
- [ ] Automatic deployment from `staging` branch  
- [ ] Environment variables configured
- [ ] SSL certificate active and valid
- [ ] Health check endpoint responding (200 OK)
- [ ] Build process successful without errors

### ✅ **SHOULD HAVE (Nice to have)**
- [ ] Preview deployments for PR branches
- [ ] Build notifications (Slack/email)
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Custom domain setup (optional)

---

## 🔧 **STEP-BY-STEP IMPLEMENTATION**

### **Step 1: Vercel Account Setup**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login
# Follow the authentication flow
```

### **Step 2: Project Configuration**
```bash
# Navigate to project root
cd "C:\Users\User\Documents\SteamPhony\Steam web"

# Initialize Vercel project
vercel

# Select configuration:
# ? Set up and deploy "Steam web"? [Y/n] y
# ? Which scope? [Use arrow keys]
# ? Link to existing project? [y/N] n
# ? What's your project's name? steamphony-frontend
# ? In which directory is your code located? ./
```

### **Step 3: Create Staging Environment**
```bash
# Create staging branch if not exists
git checkout -b staging
git push origin staging

# Deploy to staging
vercel --target staging
```

### **Step 4: Environment Configuration**
```bash
# Set staging environment variables
vercel env add VITE_APP_ENV staging --environment staging
vercel env add VITE_API_URL https://api-staging.steamphony.com --environment staging
vercel env add VITE_APP_VERSION 1.0.0-staging --environment staging

# Optional: Analytics
vercel env add VITE_GA_TRACKING_ID UA-STAGING-ID --environment staging
vercel env add VITE_SENTRY_DSN your-sentry-dsn --environment staging
```

### **Step 5: Custom Domain (Optional)**
```bash
# Add custom domain if available
vercel domains add staging.steamphony.com
vercel alias set [deployment-url] staging.steamphony.com
```

### **Step 6: Vercel Configuration File**
Create `vercel.json` in project root:

```json
{
  "version": 2,
  "git": {
    "deploymentEnabled": {
      "main": false,
      "staging": true
    }
  },
  "env": {
    "VITE_APP_ENV": "staging"
  },
  "build": {
    "env": {
      "VITE_APP_ENV": "staging"
    }
  },
  "functions": {
    "app/**": {
      "runtime": "nodejs18.x"
    }
  },
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### **Step 7: Health Check Endpoint**
Create health check in `public/health.json`:

```json
{
  "status": "ok",
  "environment": "staging", 
  "version": "1.0.0-staging",
  "timestamp": "2024-12-19T10:00:00Z",
  "services": {
    "frontend": "healthy",
    "build": "successful"
  }
}
```

### **Step 8: Testing Deployment**
```bash
# Test build locally first
npm run build
npm run preview

# Deploy to staging
vercel --prod --target staging

# Verify deployment
curl -I https://[your-staging-url]/health.json
# Should return 200 OK
```

---

## 🔍 **VERIFICATION CHECKLIST**

### **Functionality Tests**
```bash
# 1. Site loads successfully
curl -I https://[staging-url]
# Expected: 200 OK

# 2. Health endpoint works
curl https://[staging-url]/health.json
# Expected: JSON response with status "ok"

# 3. Main pages accessible
curl -I https://[staging-url]/services
curl -I https://[staging-url]/portfolio  
curl -I https://[staging-url]/contact
# Expected: All return 200 OK

# 4. Static assets load
curl -I https://[staging-url]/vite.svg
# Expected: 200 OK

# 5. Performance baseline
npm run performance:lighthouse
# Expected: Lighthouse scores generated
```

### **Security Verification**
```bash
# SSL Certificate check
curl -I https://[staging-url]
# Verify HTTPS works and certificate is valid

# Security headers check
curl -I https://[staging-url]
# Verify security headers present
```

---

## 📊 **PERFORMANCE BASELINE COLLECTION**

### **Automated Performance Testing**
```bash
# Run performance baseline after deployment
npm run performance:baseline

# Run Lighthouse audit
npx lighthouse https://[staging-url] --output=json --output-path=staging-lighthouse.json

# Bundle size analysis
npm run build:analyze
```

### **Manual Testing Checklist**
- [ ] Homepage loads under 3 seconds
- [ ] All navigation links work
- [ ] Mobile responsive design displays correctly
- [ ] Contact form submits (if implemented)
- [ ] Testimonials section displays and animates
- [ ] No console errors in browser

---

## 🚨 **TROUBLESHOOTING GUIDE**

### **Common Issues & Solutions**

#### **Build Fails**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **Environment Variables Not Working**
```bash
# Check env vars are set
vercel env ls

# Re-add if missing
vercel env add VARIABLE_NAME value --environment staging
```

#### **Domain Issues**
```bash
# Check domain configuration
vercel domains ls

# Re-verify domain
vercel domains verify [domain-name]
```

#### **SSL Certificate Issues**
```bash
# Force SSL renewal
vercel certs issue [domain-name]
```

---

## 📋 **DELIVERABLES CHECKLIST**

### **Required Outputs**
- [ ] **Staging URL**: Provide working staging URL
- [ ] **Environment Status**: Confirm all env vars set
- [ ] **Build Logs**: Share successful build output
- [ ] **Performance Baseline**: Initial Lighthouse scores
- [ ] **Health Check**: Verify health endpoint responding
- [ ] **Security Check**: Confirm HTTPS and headers
- [ ] **Documentation**: Update this guide with actual URLs

### **Handover to Web Development Lead**
```
STAGING DEPLOYMENT COMPLETE

✅ Staging URL: [INSERT ACTUAL URL]
✅ Health Check: [INSERT HEALTH URL]  
✅ Build Status: [SUCCESS/FAILED]
✅ Performance Score: [INSERT LIGHTHOUSE SCORE]
✅ SSL Status: [ACTIVE/ISSUES]
✅ Environment: [CONFIGURED/NEEDS WORK]

READY FOR: Performance verification by Performance Engineer
BLOCKED BY: [LIST ANY BLOCKERS IF APPLICABLE]
NEXT STEPS: Performance baseline measurement
```

---

## 🎯 **SUCCESS CRITERIA**

### **Definition of Done**
1. ✅ Staging URL accessible and functional
2. ✅ All main pages load without errors  
3. ✅ Health check endpoint returns 200 OK
4. ✅ SSL certificate active and valid
5. ✅ Environment variables configured
6. ✅ Build process succeeds consistently
7. ✅ Basic performance baseline collected

### **Ready for Next Phase**
- Performance Engineer can access staging for measurement
- Web Development Lead can review functionality
- Team can use staging for feature testing
- CEO can approve for next development phase

---

**📋 STAGING DEPLOYMENT GUIDE COMPLETE**  
**Ready for DevOps Engineer execution**  
**Estimated completion: 2-3 hours**  
**Next: Performance verification phase** 
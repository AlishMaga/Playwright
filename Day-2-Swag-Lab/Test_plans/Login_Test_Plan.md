# Login Test Cases

## LOGIN_01

**Test Scenario:** Login with valid credentials  
**Expected Result:** Redirect to inventory

## LOGIN_02

**Test Scenario:** Login with locked user  
**Expected Result:** Locked-out error

## LOGIN_03

**Test Scenario:** Login with incorrect password  
**Expected Result:** Error message

## LOGIN_04

**Test Scenario:** Login with empty username  
**Expected Result:** Validation error

## LOGIN_05

**Test Scenario:** Login with empty password  
**Expected Result:** Validation error

## LOGIN_06

**Test Scenario:** Login with empty username and password  
**Expected Result:** Validation error

## LOGIN_0

**Test Scenario:** Login with problem user  
**Expected Result:** Investigate unexpected behavior

## LOGIN_07

**Test Scenario:** Login with performance glitch user  
**Expected Result:** Successful login




1. standard_user logs in succesfully 
2. locked_out_user while trying to login faces an error messege stating "Epic sadface: Sorry, this user has been locked out."
3. problem_user log in succesfully but  faces error after loggin
the problem are: 
    a. the cart icon shows 1 item in it but there is no any item, 
    b. all different product has same picture,
    c. from home page we can add the cart to the product but we cannot remove it, To remove it we have to go to cart and remove from there,
    d. sort option is also not working,
    e. we can only add 3 items in the cart 
    f. with this user we can see indivisula item by clicking on items profile but in here there is option of add to cart and remove to cart but we cannot add to cart or remove from cart, but in here we can see picture of the actual product. 
    g. item not found items are also listed in the products section 
    h. and while checking out we cannot fill our credidentials 

4.visual_user: in this user there are error visually in the sites 


Task A in both wrong username and wrong password we get this error: "Epic sadface: Username and password do not match any user in this service"

Task B in emply field we get "Epic sadface: Password is required" and "Epic sadface: Username is required" if one is empty and if both are empty we get Epic sadface: Username is required

Task C login takes time long to load 

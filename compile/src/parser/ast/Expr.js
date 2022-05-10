/**
 * @author chaohui jiang
 * @version:v1.1.0
 */
import ASTNode from "./ASTNode";
import ASTTypes from "./ASTTypes";
import PriorityTable from "../PriorityTable";
import Variable from "./Variable";
import Scalar from "./Scalar";
//二项表达式 一元表达式
export default class Expr extends ASTNode{
    constructor(parent) {
        super(parent);
    }
    static formToken(parent,type,token){
        const expr = new Expr(parent);
        expr._label = token.getValue();
        expr._type = type;
        expr._lexeme = token;
        return expr;
    }
    //left: E(k)->E(k) op(k) E(K+1) | E(k+1)
    //right: E(k)->E(k+1)E_(k)
    //var e= new Expr() e.left=E(k+1) e.right=E(k+1) E_(k)
    //E_(k)->op(k) E(k+1) E_(k) | empty

    //E(t)->F E_(t)|u E_(t) 最后一层 (从left出来的,t+1为F或者u)

    static parseExpr(parent,it){
        return Expr.E(parent,it,0);
    }
    //E(k)->E(k+1)E_(k)
    ///E(t)->F E_(t)|u E_(t) (E(k+1)->F || E(k+1)->U)
    static E(parent,it,k){
        if(k<PriorityTable.length-1){
            // E(k)->E(k+1)E_(k)
            return Expr.combine(parent,it,
                ()=>Expr.E(parent,it,k+1),
                ()=>Expr.E_(parent,it,k)
                )
        }else{

            //E(t)->F E_(t)|u E_(t)
            return Expr.race(it,
                ()=>Expr.combine(parent,it,
                    ()=>Expr.F(parent,it),
                    ()=>Expr.E_(parent,it,k)
                    ),
                ()=>Expr.combine(parent,it,
                    ()=>Expr.U(parent,it),
                    ()=>Expr.E_(parent,it,k)
                    ))
        }
    }
    //E_(k)->op(k) E(k+1) E_(k) | empty
    static E_(parent,it,k){
        let token = it.peek();
        const value = token.getValue()
        if(PriorityTable[k].indexOf(value)>=0){
            it.nextMatch(value);
            let expr = Expr.formToken(parent,ASTTypes.BINARY_EXPR,token);
            expr.addChild(Expr.combine(parent,it,
                ()=>Expr.E(parent,it,k+1),
                ()=>Expr.E_(parent,it,k)
                ))
            return expr;
        }
        return null;
    }
    static F(parent,it){
        const token = it.peek();
        if(token.isVariable()){
            return new Variable(parent,it);
        }else if (token.isScalar()){
            return new Scalar(parent,it);
        }
        return null
    }
    static U(parent,it){
        const token = it.peek();
        const value = token.getValue()
        if(value === "("){
            it.nextMatch("(");
            let expr = Expr.parseExpr(parent,it);
            it.nextMatch(")");
            return expr;
        }else if(value === "++" || value === "--" || value === "!="){
            it.nextMatch(value);
            let expr = Expr.formToken(parent,ASTTypes.UNARY_EXPR,token);
            expr.addChild(Expr.parseExpr(parent,it));
            return  expr;
        }
        return null;
    }
    static combine(parent,it,fa,fb){
        if(!it.hasNext()){return null;}
        let a = it.hasNext()?fa():null;
        if(a==null){
            return  it.hasNext()?fb():null;
        }
        let b = it.hasNext()?fb():null;
        if(b==null){
            return a;
        }
        let expr = Expr.formToken(parent,ASTTypes.BINARY_EXPR,b._lexeme)
        expr.addChild(a);
        expr.addChild(b.getChild(0))
        return expr;
    }
    static race(it,fa,fb){
        if(!it.hasNext()){return null;}
        let a = fa();
        if(a==null){
            return fb();
        }
        return a;
    }
}

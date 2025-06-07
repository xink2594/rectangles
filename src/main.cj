package rectangles

import std.collection.*
import std.console.*
import std.convert.*

public class Counter{
    
}
private class Point {
    var x: Int64
    var y: Int64

    init(x: Int64, y: Int64) {
        this.x = x
        this.y = y
    }
}
    
private func possiblePointsHorizontal(inputGrid :ArrayList<String>, p :Point) : ArrayList<Point> {
    var points = ArrayList<Point>()
    var row : String = inputGrid[p.y]
    let charArrayX = row.toRuneArray();
    for  (x in (p.x +1)..row.size) {
        // var targetChar: Rune = charArrayX[x]
        if (charArrayX[x] == r'+') {
            var newPoint = Point(x, p.y)
            points.append(newPoint)
        } else if (charArrayX[x] != r'-') {
            break
        }
    }
    return points
}

private func possiblePointsVertical(inputGrid :ArrayList<String>, p :Point) : ArrayList<Point> {
    var points = ArrayList<Point>()

    for (y in (p.y + 1)..inputGrid.size) {
        if (p.x >= inputGrid[y].size) {
            break
        }
        var charArrayY = inputGrid[y].toRuneArray();
        // var targetChar: Rune = charArrayY[p.x]
        if (charArrayY[p.x] == r'+') {
            var newPoint = Point(p.x, y)
            points.append(newPoint)
        } else if (charArrayY[p.x] != r'|') {
            break
        }
    }
    return points
}

private func findP4(inputGrid :ArrayList<String>, p2 :Point, p3 :Point) : Point {
    var p4x : Int64 = p2.x
    var p4y : Int64 = p3.y
    
    if (p4x <= p3.x || p4y <= p2.y) {
        return Point(-1, -1)
    }
    
    var p4yCharAt = inputGrid[p4y].toRuneArray();
    if (p4x >= inputGrid[p4y].size || p4y >= inputGrid.size ||p4yCharAt[p4x] != r'+') {
        return Point(-1, -1)
    }

    for (x in (p3.x +1)..p4x) {
        if (x>= inputGrid[p4y].size) {
            return Point(-1, -1)
        }
        var p4yCharAt = inputGrid[p4y].toRuneArray();
        if (p4yCharAt[x] != r'-' && p4yCharAt[x] != r'+') {
            return Point(-1, -1)
        }
    }

    for (y in (p2.y + 1)..p4y) {
        if (y >= inputGrid.size || p4x >= inputGrid[y].size) {
            return Point(-1, -1)
        }
        var p4xCharAt = inputGrid[y].toRuneArray();
        if (p4xCharAt[p4x] != r'|' && p4xCharAt[p4x] != r'+') {
            return Point(-1, -1)
        }
    }

    var newPoints = Point(p4x, p4y)
    return newPoints
}

private func findRectsFormPoint(p1 : Point, inputGrid : ArrayList<String>) : Int64 {
    var count : Int64 = 0
    var possiblePoints2 : ArrayList<Point> = possiblePointsHorizontal(inputGrid, p1)
    var possiblePoints3 : ArrayList<Point> = possiblePointsVertical(inputGrid, p1)
    // var p2 :Point
    // var p3 :Point
    // var p4 :Point
    for (p2 in possiblePoints2) {
        for (p3 in possiblePoints3) {
            var p4 = findP4(inputGrid, p2, p3)
            if (p4.x != -1 && p4.y != -1) {
                count += 1
            }
        }
    }

    return count
}

public func countRectangles(inputGrid : ArrayList<String>) : Int64 {
    var count : Int64 = 0
    for (y in 0..inputGrid.size) {
        var row = inputGrid[y]
        var charArray = row.toRuneArray();
        for (x in 0..charArray.size) {
            if (charArray[x] == r'+') {
                var newPoint = Point(x, y)
                count += findRectsFormPoint(newPoint, inputGrid)
            }
        }
    }
    return count
}


main() {
    println("请输入网格数据，使用Enter结束输入：")
    // var numRows : Int64 = 0
    let input = Console.stdIn.readln()
    
    var p : Int64 = Int64.parse(input ?? "")

    try{
        let numRows = Int64.parse(input ?? "")
        if(numRows <= 0) {
            println("输入的行数必须大于0。")
            return
        }
    } catch (e: IllegalArgumentException){
        println("输入的行数无效，请输入一个数字。")
        return
    }

    var inputGrid : ArrayList<String> = ArrayList<String>()
    println("请输入网格的每一行，完成后按Enter:")
    for (i in 0..p) {
        print("行 ${i+1}: ")
        inputGrid.append(Console.stdIn.readln().getOrThrow())
    }

    var rectangleCount = countRectangles(inputGrid)
    println("找到的矩形数量: ${rectangleCount}")

    return
}